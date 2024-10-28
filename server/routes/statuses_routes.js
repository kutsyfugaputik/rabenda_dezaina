const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Роуты для статусов
router.get('/', statusController.getAllStatuses); // Получить все статусы
router.get('/:id', statusController.getStatusById); // Получить статус по ID


module.exports = router;
