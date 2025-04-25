// routes/user_routes.js

const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const userController = require('../controllers/userController'); // Импортируем контроллер для работы с пользователями
const authMiddleware = require('../middleware/authMiddleware'); // Импортируем middleware для аутентификации пользователя
const logAction = require('../utils/logger'); // Импортируем логгер
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок


// Роут для получения всех пользователей
router.get('/', async (req, res, next) => {
    try {
        logAction('Получен запрос на получение всех пользователей.', '📝'); // Логируем запрос на получение всех пользователей
        await userController.getAll(req, res); // Вызов метода getAll из контроллера
        logAction('Все пользователи успешно получены.', '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении пользователей: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении пользователей.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для регистрации пользователя
router.post('/register', async (req, res, next) => {
    try {
        logAction('Получен запрос на регистрацию нового пользователя.', '📝'); // Логируем запрос на регистрацию
        await userController.register(req, res); // Вызов метода register из контроллера
        logAction('Пользователь успешно зарегистрирован.', '✅'); // Логируем успешную регистрацию
    } catch (error) {
        logAction(`Ошибка при регистрации пользователя: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при регистрации пользователя.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для входа пользователя
router.post('/login', async (req, res, next) => {
    try {
        logAction('Получен запрос на вход пользователя.', '📝'); // Логируем запрос на вход
        await userController.loginClient(req, res); // Вызов метода loginClient из контроллера
        logAction('Пользователь успешно вошел в систему.', '✅'); // Логируем успешный вход
    } catch (error) {
        logAction(`Ошибка при входе пользователя: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при входе пользователя.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для выхода пользователя
router.post('/logout', async (req, res, next) => {
    try {
        logAction('Получен запрос на выход пользователя.', '📝'); // Логируем запрос на выход
        await userController.logout(req, res); // Вызов метода logout из контроллера
        logAction('Пользователь успешно вышел из системы.', '✅'); // Логируем успешный выход
    } catch (error) {
        logAction(`Ошибка при выходе пользователя: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при выходе пользователя.')); // Обрабатываем ошибку с помощью ApiError
    }
});

module.exports = router; // Экспортируем маршрутизатор, чтобы он был доступен для использования в других частях приложения
