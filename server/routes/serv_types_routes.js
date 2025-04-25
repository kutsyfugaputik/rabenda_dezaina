const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const typeServiceController = require('../controllers/serv_typesController'); // Импортируем контроллер для работы с типами услуг
const logAction = require('../utils/logger'); // Импортируем логгер
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

// Роуты для типов услуг

// Роут для получения всех типов услуг
router.get('/', async (req, res, next) => {
    try {
        logAction('Получен запрос на получение всех типов услуг.', '📝'); // Логируем запрос на получение всех типов услуг
        await typeServiceController.getAll(req, res); // Вызов метода getAll из контроллера
        logAction('Типы услуг успешно получены.', '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении типов услуг: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении типов услуг.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для получения типа услуги по ID
router.get('/:service_type_id', async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение типа услуги с ID: ${req.params.service_type_id}.`, '📝'); // Логируем запрос на получение типа услуги по ID
        await typeServiceController.getById(req, res); // Вызов метода getById из контроллера
        logAction(`Тип услуги с ID: ${req.params.service_type_id} успешно получен.`, '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении типа услуги с ID: ${req.params.service_type_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении типа услуги по ID.')); // Обрабатываем ошибку с помощью ApiError
    }
});

module.exports = router; // Экспортируем маршрутизатор, чтобы он был доступен в других частях приложения
