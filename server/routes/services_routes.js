const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const serviceController = require('../controllers/serviceController'); // Импортируем контроллер для работы с услугами
const logAction = require('../utils/logger'); // Импортируем логгер
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

// Роуты для операций с услугами

// Роут для получения всех услуг
router.get('/', async (req, res, next) => {
    try {
        logAction('Получен запрос на получение всех услуг.', '📝'); // Логируем запрос на получение всех услуг
        await serviceController.getAll(req, res); // Вызов метода getAll из контроллера
        logAction('Все услуги успешно получены.', '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении услуг: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении услуг.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для получения услуги по ID
router.get('/:service_id', async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение услуги с ID: ${req.params.service_id}.`, '📝'); // Логируем запрос на получение услуги по ID
        await serviceController.getById(req, res); // Вызов метода getById из контроллера
        logAction(`Услуга с ID: ${req.params.service_id} успешно получена.`, '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении услуги с ID: ${req.params.service_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении услуги по ID.')); // Обрабатываем ошибку с помощью ApiError
    }
});

module.exports = router; // Экспортируем маршрутизатор, чтобы он был доступен в других частях приложения
