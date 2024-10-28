require('dotenv').config();
const express = require('express');
const sequelize = require('./modules/db');
const cors = require('cors');
const router = require('./routes/index');

const PORT = process.env.PORT; // Значение по умолчанию

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Соединение с базой данных успешно установлено.');
        
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`|Все в порядке!| :3 Север запущен на порте - ${PORT}`);
        });
    } catch (e) {
        console.error('Ошибка при старте:', e);
    }
};

start();
