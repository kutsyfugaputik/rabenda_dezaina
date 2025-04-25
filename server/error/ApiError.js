// Импорт логгера для записи ошибок в файл и в консоль
const logAction = require('../utils/logger');

// Класс `ApiError` наследует встроенный класс `Error` и добавляет поддержку HTTP-статусов
class ApiError extends Error {
    constructor(status, message) {
        super(); // Вызываем конструктор базового класса Error
        this.status = status; // Устанавливаем HTTP-статус ошибки
        this.message = message; // Устанавливаем текст сообщения ошибки

        // Логируем создание ошибки при инициализации
        logAction(`Создана ошибка: [${status}] ${message}`, '⚠️');
    }

    // Статический метод для создания ошибки 400 (Некорректный запрос)
    static badRequest(message) {
        return new ApiError(400, message);
    }

    // Статический метод для создания ошибки 500 (Внутренняя ошибка сервера)
    static internal(message) {
        return new ApiError(500, message);
    }

    // Статический метод для создания ошибки 404 (Ресурс не найден)
    static notFound(message) {
        return new ApiError(404, message);
    }
}

// Экспортируем класс `ApiError` для использования в других частях проекта
module.exports = ApiError;
