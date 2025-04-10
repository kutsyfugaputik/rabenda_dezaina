const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const fs = require('fs');
const cron = require('node-cron');
const sequelize = require('./modules/db');
const cors = require('cors');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', router);

// Получение локального IP с приоритетом 192.168.01*
function getLocalExternalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal && iface.address.startsWith('192.168.0.')) {
                return iface.address;
            }
        }
    }
    // fallback
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// Функция бэкапа базы
function backupDatabase() {
    const backupDir = path.join(__dirname, 'backups');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `backup-${timestamp}.dump`);
    const pgDumpPath = process.env.PG_DUMP_PATH.replace(/"/g, ''); // Удалим кавычки

    const dumpCommand = `"${pgDumpPath}" -U ${process.env.DB_USER} -h ${process.env.DB_HOST} -d ${process.env.DB_NAME} -F c -f "${backupPath}"`;

    exec(dumpCommand, { env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD } }, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Ошибка при бэкапе: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`⚠️ stderr: ${stderr}`);
        }
        console.log(`✅ Бэкап создан: ${backupPath}`);
    });
}

// Запуск каждые 30 минут
cron.schedule('*/30 * * * *', () => {
    console.log('🕒 Запуск автоматического бэкапа...');
    backupDatabase();
});

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Соединение с базой данных установлено.');
        await sequelize.sync();

        app.listen(PORT, () => {
            const IP = getLocalExternalIP();
            console.log(`🚀 Сервер запущен на порте ${PORT}`);
            console.log(`🌐 Локально: http://localhost:${PORT}/api/`);
            console.log(`📡 В сети:   http://${IP}:${PORT}/api/`);

            console.log('🗂️ Бэкап при старте сервера...');
            backupDatabase();
        });
    } catch (e) {
        console.error('❌ Ошибка при старте сервера:', e);
    }
};

start();
