const jwt = require('jsonwebtoken'); // Подключение библиотеки для работы с JWT
const ApiError = require('../error/ApiError'); // Кастомный класс для обработки API-ошибок
const logAction = require('../utils/logger'); // Функция для логирования действий

// Middleware для проверки авторизации через cookie
function authMiddleware(req, res, next) {
    logAction('🔐 Запрос на проверку авторизации через JWT');

    // Получаем токен из cookies
    const token = req.cookies.token;
    logAction(`📦 Полученный токен из куки: ${token}`);

    if (!token) {
        // Если токен отсутствует — пользователь не авторизован
        logAction('❌ Ошибка: токен не найден в cookie');
        return next(ApiError.unauthorized('Необходима авторизация'));
    }

    try {
        // Декодируем токен с использованием секретного ключа
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        logAction(`✅ Токен успешно декодирован. ID: ${decoded.id}, Role: ${decoded.role}`);

        // Сохраняем данные из токена в объект запроса
        req.user = { id: decoded.id, role: decoded.role };

        // Передаём управление следующему middleware или обработчику
        next();
    } catch (error) {
        // Логируем ошибку верификации токена
        logAction(`🚨 Ошибка при верификации токена: ${error.message}`);
        return next(ApiError.unauthorized('Неверный или истекший токен'));
    }
}

module.exports = authMiddleware;
