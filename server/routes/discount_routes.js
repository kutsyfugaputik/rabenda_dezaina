const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

// Роуты для мастеров
router.get('/', discountController.getAll); // Получить всех мастеров
router.get('/:id', discountController.getById); // Получить мастера по ID
router.post('/', discountController.create); // Создать мастера


module.exports = router;