const express = require('express'); // Импортируем библиотеку express для работы с маршрутизацией
const router = express.Router(); // Создаем новый объект маршрутизатора
const feedbackController = require('../controllers/feedbackController'); // Импортируем контроллер отзывов
const authMiddleware = require('../middleware/authMiddleware'); // Импортируем middleware для аутентификации пользователя
const logAction = require('../utils/logger'); // Импортируем логгер для записи логов
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

// Роуты для работы с отзывами
router.get('/', async (req, res, next) => { 
    try {
        logAction('Получен запрос на получение всех отзывов.', '📝'); // Логируем запрос на получение всех отзывов
        await feedbackController.getAll(req, res); // Вызов метода getAll контроллера для получения всех отзывов
        logAction('Все отзывы успешно получены.', '✅'); // Логируем успешное выполнение запроса
    } catch (error) {
        logAction(`Ошибка при получении всех отзывов: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении отзывов.')); // Обрабатываем ошибку с помощью ApiError
    }
});

router.get('/:feedback_id', async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение отзыва с ID: ${req.params.feedback_id}`, '📝'); // Логируем запрос на получение отзыва по ID
        await feedbackController.getById(req, res); // Вызов метода getById контроллера для получения отзыва по ID
        logAction(`Отзыв с ID: ${req.params.feedback_id} успешно получен.`, '✅'); // Логируем успешное выполнение запроса
    } catch (error) {
        logAction(`Ошибка при получении отзыва с ID: ${req.params.feedback_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении отзыва по ID.')); // Обрабатываем ошибку с помощью ApiError
    }
});

router.post('/', authMiddleware, async (req, res, next) => {
    try {
        logAction('Получен запрос на создание нового отзыва.', '📝'); // Логируем запрос на создание нового отзыва
        await feedbackController.create(req, res); // Вызов метода create контроллера для создания отзыва
        logAction('Новый отзыв успешно создан.', '✅'); // Логируем успешное создание отзыва
    } catch (error) {
        logAction(`Ошибка при создании отзыва: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при создании отзыва.')); // Обрабатываем ошибку с помощью ApiError
    }
});

module.exports = router; // Экспортируем роутер, чтобы его можно было использовать в других частях приложения
