const fs = require('fs');
const path = require('path');

// Универсальная функция логирования с учетом московского времени
function logAction(message, emoji = '📝') {
    // Получаем московское время как отдельные компоненты
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const parts = formatter.formatToParts(new Date());
    const getPart = type => parts.find(p => p.type === type)?.value;

    const year = getPart('year');
    const month = getPart('month');
    const day = getPart('day');
    const hour = getPart('hour');
    const minute = getPart('minute');
    const second = getPart('second');

    const timestamp = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    const logMessage = `[${timestamp}] ${emoji} ${message}\n`;

    // Путь к файлу логов (по дате)
    const dateForFile = `${year}-${month}-${day}`;
    const logDir = path.resolve(__dirname, '../logs');
    const logFilePath = path.join(logDir, `${dateForFile}.txt`);

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(logFilePath, logMessage);
    console.log(logMessage.trim());
}

module.exports = logAction;
