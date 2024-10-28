const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');


// Роуты для статусов
router.get('/', statusController.getAll); // Получить все статусы
router.get('/:id', statusController.getById); // Получить статус по ID


module.exports = router;
