const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const requestsController = require('../controllers/reqController'); // Импортируем контроллер для работы с заявками
const authMiddleware = require('../middleware/authMiddleware'); // Импортируем middleware для аутентификации пользователя
const roleMiddleware = require('../middleware/roleMiddleware'); // Импортируем middleware для проверки роли пользователя
const logAction = require('../utils/logger'); // Импортируем логгер
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

// Роут для создания новой заявки
router.post('/create', authMiddleware, async (req, res, next) => {
    try {
        logAction('Получен запрос на создание новой заявки.', '📝');
        await requestsController.createRequest(req, res); // Вызов метода createRequest из контроллера
    } catch (error) {
        logAction(`Ошибка при создании заявки: ${error.message}`, '❌');
        next(ApiError.internal('Ошибка при создании заявки.'));
    }
});

// Роут для изменения статуса заявки на 'завершена'
router.put('/:request_id/complete', async (req, res, next) => {
    try {
        logAction(`Получен запрос на изменение статуса заявки с ID ${req.params.request_id} на 'завершена'.`, '📝');
        await requestsController.updateToComplete(req, res); // Вызов метода updateToComplete из контроллера
    } catch (error) {
        logAction(`Ошибка при изменении статуса заявки с ID ${req.params.request_id}: ${error.message}`, '❌');
        next(ApiError.internal('Ошибка при изменении статуса заявки на завершена.'));
    }
});

// Роут для изменения статуса заявки на 'отменена'
router.put('/:request_id/cancel', authMiddleware, roleMiddleware('master'), async (req, res, next) => {
    try {
        logAction(`Получен запрос на изменение статуса заявки с ID ${req.params.request_id} на 'отменена'.`, '📝');
        await requestsController.updateToCanceled(req, res); // Вызов метода updateToCanceled из контроллера
    } catch (error) {
        logAction(`Ошибка при изменении статуса заявки с ID ${req.params.request_id}: ${error.message}`, '❌');
        next(ApiError.internal('Ошибка при изменении статуса заявки на отменена.'));
    }
});

// Роут для изменения статуса заявки на 'подтверждена'
router.put('/:request_id/confirm', authMiddleware, roleMiddleware('master'), async (req, res, next) => {
    try {
        logAction(`Получен запрос на изменение статуса заявки с ID ${req.params.request_id} на 'подтверждена'.`, '📝');
        await requestsController.updateToConfirm(req, res); // Вызов метода updateToConfirm из контроллера
    } catch (error) {
        logAction(`Ошибка при изменении статуса заявки с ID ${req.params.request_id}: ${error.message}`, '❌');
        next(ApiError.internal('Ошибка при изменении статуса заявки на подтверждена.'));
    }
});

// Роут для получения всех заявок мастера
router.get('/master/:master_id', async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение всех заявок мастера с ID: ${req.params.master_id}.`, '📝');
        await requestsController.getRequestsByMaster(req, res); // Вызов метода getRequestsByMaster из контроллера
    } catch (error) {
        logAction(`Ошибка при получении заявок мастера с ID: ${req.params.master_id}: ${error.message}`, '❌');
        next(ApiError.internal('Ошибка при получении заявок мастера.'));
    }
});

// Роут для получения всех заявок клиента
router.get('/client/:client_id', async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение всех заявок клиента с ID: ${req.params.client_id}.`, '📝');
        await requestsController.getRequestsByClient(req, res); // Вызов метода getRequestsByClient из контроллера
    } catch (error) {
        logAction(`Ошибка при получении заявок клиента с ID: ${req.params.client_id}: ${error.message}`, '❌');
        next(ApiError.internal('Ошибка при получении заявок клиента.'));
    }
});

module.exports = router; // Экспортируем маршрутизатор
