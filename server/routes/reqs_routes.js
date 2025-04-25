// routes/requests_routes.js
const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const requestsController = require('../controllers/reqController'); // Импортируем контроллер для работы с заявками
const authMiddleware = require('../middleware/authMiddleware'); // Импортируем middleware для аутентификации пользователя
const roleMiddleware = require('../middleware/roleMiddleware'); // Импортируем middleware для проверки роли пользователя
const logAction = require('../utils/logger'); // Импортируем логгер
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

// Роуты для создания и управления заявками

// Роут для создания новой заявки
router.post('/create', authMiddleware, async (req, res, next) => {
    try {
        logAction('Получен запрос на создание новой заявки.', '📝'); // Логируем запрос на создание новой заявки
        await requestsController.createRequest(req, res); // Вызов метода createRequest из контроллера
        logAction('Новая заявка успешно создана.', '✅'); // Логируем успешный ответ
    } catch (error) {
        logAction(`Ошибка при создании заявки: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при создании заявки.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для изменения статуса заявки на 'завершена'
router.put('/:request_id/complete', async (req, res, next) => {
    try {
        logAction(`Получен запрос на изменение статуса заявки с ID ${req.params.request_id} на 'завершена'.`, '📝'); // Логируем запрос на изменение статуса
        await requestsController.updateToComplete(req, res); // Вызов метода updateToComplete из контроллера
        logAction(`Статус заявки с ID ${req.params.request_id} успешно изменен на 'завершена'.`, '✅'); // Логируем успешное изменение
    } catch (error) {
        logAction(`Ошибка при изменении статуса заявки с ID ${req.params.request_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при изменении статуса заявки на завершена.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для изменения статуса заявки на 'отменена'
router.put('/:request_id/cancel', authMiddleware, roleMiddleware('master'), async (req, res, next) => {
    try {
        logAction(`Получен запрос на изменение статуса заявки с ID ${req.params.request_id} на 'отменена'.`, '📝'); // Логируем запрос на изменение статуса
        await requestsController.updateToCanceled(req, res); // Вызов метода updateToCanceled из контроллера
        logAction(`Статус заявки с ID ${req.params.request_id} успешно изменен на 'отменена'.`, '✅'); // Логируем успешное изменение
    } catch (error) {
        logAction(`Ошибка при изменении статуса заявки с ID ${req.params.request_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при изменении статуса заявки на отменена.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для изменения статуса заявки на 'подтверждена'
router.put('/:request_id/confirm', authMiddleware, roleMiddleware('master'), async (req, res, next) => {
    try {
        logAction(`Получен запрос на изменение статуса заявки с ID ${req.params.request_id} на 'подтверждена'.`, '📝'); // Логируем запрос на изменение статуса
        await requestsController.updateToConfirm(req, res); // Вызов метода updateToConfirm из контроллера
        logAction(`Статус заявки с ID ${req.params.request_id} успешно изменен на 'подтверждена'.`, '✅'); // Логируем успешное изменение
    } catch (error) {
        logAction(`Ошибка при изменении статуса заявки с ID ${req.params.request_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при изменении статуса заявки на подтверждена.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для получения всех заявок мастера
router.get('/master/:master_id', async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение всех заявок мастера с ID: ${req.params.master_id}.`, '📝'); // Логируем запрос на получение заявок мастера
        await requestsController.getRequestsByMaster(req, res); // Вызов метода getRequestsByMaster из контроллера
        logAction(`Заявки мастера с ID: ${req.params.master_id} успешно получены.`, '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении заявок мастера с ID: ${req.params.master_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении заявок мастера.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для получения всех заявок клиента
router.get('/client/:client_id', async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение всех заявок клиента с ID: ${req.params.client_id}.`, '📝'); // Логируем запрос на получение заявок клиента
        await requestsController.getRequestsByClient(req, res); // Вызов метода getRequestsByClient из контроллера
        logAction(`Заявки клиента с ID: ${req.params.client_id} успешно получены.`, '✅'); // Логируем успешное выполнение
    } catch (error) {
        logAction(`Ошибка при получении заявок клиента с ID: ${req.params.client_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении заявок клиента.')); // Обрабатываем ошибку с помощью ApiError
    }
});

module.exports = router; // Экспортируем маршрутизатор, чтобы он был доступен в других частях приложения
