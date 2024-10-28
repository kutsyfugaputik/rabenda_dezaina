const express = require('express');
const router = express.Router();
const requestController = require('../controllers/reqController');


// Роуты для запросов
router.get('/', requestController.getAll); // Получить все запросы
router.get('/:id', requestController.getById); // Получить запрос по ID
router.post('/', requestController.create); // Создать запрос


module.exports = router;
