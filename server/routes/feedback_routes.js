const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Роуты для мастеров
router.get('/', feedbackController.getAllMasters); // Получить всех мастеров
router.get('/:id', feedbackController.getMasterById); // Получить мастера по ID
router.post('/', authMiddleware, feedbackController.createMaster); // Создать мастера
router.put('/:id', authMiddleware, feedbackController.updateMaster); // Обновить мастера
router.delete('/:id', authMiddleware, feedbackController.deleteMaster); // Удалить мастера

module.exports = router;