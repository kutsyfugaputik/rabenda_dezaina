const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const statusController = require('../controllers/statusController'); // Импортируем контроллер для работы со статусами
const logAction = require('../utils/logger'); // Импортируем логгер
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

// Роуты для статусов

// Роут для получения всех статусов
router.get('/', async (req, res, next) => {
    try {
        logAction('Получен запрос на получение всех статусов.', '📝'); // Логируем запрос на получение всех статусов
        await statusController.getAll(req, res); // Вызов метода getAll из контроллера
        logAction('Все статусы успешно получены.', '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении статусов: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении статусов.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для получения статуса по ID
router.get('/:status_id', async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение статуса с ID: ${req.params.status_id}.`, '📝'); // Логируем запрос на получение статуса по ID
        await statusController.getById(req, res); // Вызов метода getById из контроллера
        logAction(`Статус с ID: ${req.params.status_id} успешно получен.`, '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении статуса с ID: ${req.params.status_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении статуса по ID.')); // Обрабатываем ошибку с помощью ApiError
    }
});

module.exports = router; // Экспортируем маршрутизатор, чтобы он был доступен в других частях приложения
