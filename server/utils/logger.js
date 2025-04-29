const fs = require('fs'); 
// Подключение встроенного модуля для работы с файловой системой.

const path = require('path'); 
// Подключение встроенного модуля для работы с путями файлов и директорий.

// Универсальная функция логирования с учетом московского времени
function logAction(message, emoji = '📝') { 
    // Определение функции logAction, которая принимает текст сообщения и дополнительный символ (эмодзи).

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    // Создание форматировщика даты и времени с привязкой к часовому поясу Москвы и нужным форматом вывода.

    const parts = formatter.formatToParts(new Date());
    // Форматирование текущей даты и времени в массив объектов с разбивкой на отдельные части (год, месяц и т.д.).

    const getPart = type => parts.find(p => p.type === type)?.value;
    // Вспомогательная функция для извлечения нужной части даты по типу (например, только "year" или "minute").

    const year = getPart('year');
    const month = getPart('month');
    const day = getPart('day');
    const hour = getPart('hour');
    const minute = getPart('minute');
    const second = getPart('second');
    // Извлечение из массива конкретных значений: года, месяца, дня, часа, минуты и секунды.

    const timestamp = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    // Формирование строки временной метки в удобочитаемом формате.

    const logMessage = `[${timestamp}] ${emoji} ${message}\n`;
    // Формирование итогового текста для записи в лог с добавлением времени и эмодзи.

    const dateForFile = `${year}-${month}-${day}`;
    // Формирование даты для использования в названии файла лога.

    const logDir = path.resolve(__dirname, '../logs');
    // Определение абсолютного пути к папке для хранения логов (папка на уровень выше текущего файла, папка "logs").

    const logFilePath = path.join(logDir, `${dateForFile}.txt`);
    // Формирование полного пути к файлу лога за конкретную дату.

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    // Проверка существования папки для логов; если папки нет — она создается.

    fs.appendFileSync(logFilePath, logMessage);
    // Добавление сформированного сообщения в файл лога. Если файла нет, он будет создан.

    console.log(logMessage.trim());
    // Вывод лог-сообщения в консоль без лишнего переноса строки.
}

module.exports = logAction;  
// Экспорт функции logAction для использования в других файлах проекта.
