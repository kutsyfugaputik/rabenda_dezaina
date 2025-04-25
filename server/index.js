const dotenv = require('dotenv').config(); // Загружаем переменные окружения из файла .env
const express = require('express'); // Импортируем библиотеку express для создания сервера
const path = require('path'); // Модуль для работы с путями файлов
const os = require('os'); // Модуль для работы с операционной системой
const { exec } = require('child_process'); // Модуль для выполнения команд в командной строке
const fs = require('fs'); // Модуль для работы с файловой системой
const cron = require('node-cron'); // Модуль для планирования заданий
const sequelize = require('./modules/db'); // Импортируем объект для работы с базой данных
const cors = require('cors'); // Модуль для работы с CORS
const router = require('./routes/index'); // Импортируем маршруты приложения
const cookieParser = require('cookie-parser'); // Модуль для парсинга cookies
const logAction = require('./utils/logger'); // Импортируем функцию логирования
const ApiError = require('./error/ApiError'); // Импортируем класс для обработки ошибок

const PORT = process.env.PORT || 3000; // Получаем порт из переменной окружения или используем 3000 по умолчанию
const app = express(); // Создаем объект приложения

logAction('Инициализация приложения...', '🔧'); // Логируем начало инициализации приложения

app.use(cors()); // Разрешаем все домены для CORS
app.use(express.json()); // Мидлвар для парсинга JSON тела запросов
app.use(cookieParser()); // Мидлвар для парсинга cookies
app.use('/public', express.static(path.join(__dirname, 'public'))); // Статическая папка для публичных файлов
app.use('/api', router); // Подключаем маршруты для API

logAction('Конфигурация мидлваров завершена', '✅'); // Логируем завершение конфигурации мидлваров

// Получение локального IP с приоритетом 192.168.0.*
function getLocalExternalIP() {
    logAction('Запуск получения локального IP адреса...', '🌐'); // Логируем начало поиска IP

    const interfaces = os.networkInterfaces(); // Получаем все сетевые интерфейсы
    logAction(`Найдено ${Object.keys(interfaces).length} интерфейсов для проверки`, '🔍'); // Логируем количество интерфейсов

    for (const name of Object.keys(interfaces)) { // Перебираем все интерфейсы
        for (const iface of interfaces[name]) { // Перебираем каждый интерфейс
            if (iface.family === 'IPv4' && !iface.internal && iface.address.startsWith('192.168.0.')) {
                logAction(`Найден локальный IP: ${iface.address}`, '✅'); // Логируем успешное нахождение IP
                return iface.address; // Возвращаем IP, если он в нужном диапазоне
            }
        }
    }
    // fallback
    logAction('Локальный IP не найден в сети 192.168.0.*, пытаемся получить общий IP...', '⚠️'); // Логируем fallback

    for (const name of Object.keys(interfaces)) { // Перебираем интерфейсы снова на случай fallback
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                logAction(`Найден общий IP: ${iface.address}`, '⚠️'); // Логируем найденный IP
                return iface.address;
            }
        }
    }

    logAction('Не удалось найти IP адрес. Используется localhost.', '⚠️'); // Логируем отсутствие IP
    return 'localhost'; // Если не нашли, возвращаем localhost
}

// Функция бэкапа базы
function backupDatabase() {
    logAction('Запуск бэкапа базы данных...', '🗂️'); // Логируем начало процесса бэкапа

    const backupDir = path.join(__dirname, 'backups'); // Путь к папке для бэкапов
    if (!fs.existsSync(backupDir)) { // Если папка для бэкапов не существует
        fs.mkdirSync(backupDir); // Создаем её
        logAction(`Создана папка для бэкапов: ${backupDir}`, '✅'); // Логируем создание папки
    } else {
        logAction('Папка для бэкапов уже существует', 'ℹ️'); // Логируем, если папка уже существует
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Форматируем текущую дату для имени бэкапа
    const backupPath = path.join(backupDir, `backup-${timestamp}.dump`); // Формируем путь к файлу бэкапа
    logAction(`Путь к файлу бэкапа: ${backupPath}`, '📝'); // Логируем путь для файла бэкапа

    const pgDumpPath = process.env.PG_DUMP_PATH.replace(/"/g, ''); // Убираем кавычки из пути к pg_dump
    logAction(`Используем pg_dump путь: ${pgDumpPath}`, '🔧'); // Логируем путь к pg_dump

    const dumpCommand = `"${pgDumpPath}" -U ${process.env.DB_USER} -h ${process.env.DB_HOST} -d ${process.env.DB_NAME} -F c -f "${backupPath}"`; // Формируем команду для бэкапа
    logAction(`Сформированная команда для бэкапа: ${dumpCommand}`, '📝'); // Логируем команду для бэкапа

    exec(dumpCommand, { env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD } }, (error, stdout, stderr) => {
        if (error) {
            logAction(`❌ Ошибка при бэкапе: ${error.message}`, '⚠️'); // Логируем ошибку
            return;
        }
        if (stderr) {
            logAction(`⚠️ stderr: ${stderr}`, '⚠️'); // Логируем stderr
        }
        logAction(`✅ Бэкап успешно создан: ${backupPath}`, '🗂️'); // Логируем успешное завершение бэкапа
    });
}

// Запуск каждые 30 минут
cron.schedule('*/30 * * * *', () => {
    logAction('Запуск автоматического бэкапа...', '🕒'); // Логируем запуск автоматического бэкапа
    backupDatabase(); // Выполняем бэкап
});

// Основной процесс запуска сервера
const start = async () => {
    logAction('Запуск сервера...', '🚀'); // Логируем начало запуска сервера
    try {
        await sequelize.authenticate(); // Проверяем соединение с базой данных
        logAction('✅ Соединение с базой данных установлено.', '✅'); // Логируем успешное соединение с базой данных
        await sequelize.sync(); // Синхронизируем модели с базой данных
        logAction('✅ Синхронизация с базой данных завершена.', '✅'); // Логируем завершение синхронизации

        app.listen(PORT, () => {
            const IP = getLocalExternalIP(); // Получаем локальный IP
            logAction(`🚀 Сервер запущен на порте ${PORT}`, '✅'); // Логируем запуск сервера
            logAction(`🌐 Локально: http://localhost:${PORT}/api/`, '🌍'); // Логируем локальный адрес
            logAction(`📡 В сети:   http://${IP}:${PORT}/api/`, '📡'); // Логируем сетевой адрес

            logAction('🗂️ Бэкап при старте сервера...', '🕒'); // Логируем запуск бэкапа при старте сервера
            backupDatabase(); // Выполняем бэкап при старте
        });
    } catch (e) {
        logAction(`❌ Ошибка при старте сервера: ${e.message}`, '⚠️'); // Логируем ошибку при старте
        throw ApiError.internal('Ошибка при старте сервера'); // Генерируем ошибку 500 через ApiError
    }
};

start();
