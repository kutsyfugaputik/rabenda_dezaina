const express = require('express');
const router = express.Router();
const requestController = require('../controllers/reqController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Роуты для запросов
router.get('/', requestController.getAllRequests); // Получить все запросы
router.get('/:id', requestController.getRequestById); // Получить запрос по ID
router.post('/', authMiddleware, requestController.createRequest); // Создать запрос
router.put('/:id', authMiddleware, requestController.updateRequest); // Обновить запрос
router.delete('/:id', authMiddleware, requestController.deleteRequest); // Удалить запрос

module.exports = router;
