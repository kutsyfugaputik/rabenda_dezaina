// routes/requests_routes.js
const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const requestsController = require('../controllers/reqController'); // Импортируем контроллер для работы с заявками

// Роуты для создания и управления заявками

// Роут для создания новой заявки
router.post('/create', requestsController.createRequest); 
// Этот маршрут вызывает метод createRequest из контроллера, который будет создавать новую заявку.


// Роут для изменения статуса заявки на 'завершена'
router.put('/:requestId/complete', requestsController.updateToComplete); 
// Этот маршрут вызывает метод updateToComplete из контроллера, который меняет статус заявки на 'завершена'.
// В запросе передается ID заявки (requestId).


// Роут для изменения статуса заявки на 'отменена'
router.put('/:requestId/cancel', requestsController.updateToCanceled);
// Этот маршрут вызывает метод updateToCanceled из контроллера, который меняет статус заявки на 'отменена'.
// В запросе передается ID заявки (requestId).


// Роут для изменения статуса заявки на 'подтверждена'
router.put('/:requestId/confirm', requestsController.updateToConfirm);
// Этот маршрут вызывает метод updateToConfirm из контроллера, который меняет статус заявки на 'подтверждена'.
// В запросе передается ID заявки (requestId).


// Роут для получения информации о заявке по ее ID
router.get('/:requestId', requestsController.getRequest);
// Этот маршрут вызывает метод getRequest из контроллера, который возвращает данные о заявке по ее ID.
// В запросе передается ID заявки (requestId).

module.exports = router; 
// Экспортируем маршрутизатор, чтобы он был доступен в других частях приложения
