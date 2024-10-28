const express = require('express');
const router = express.Router();
const typeServiceController = require('../controllers/serv_typesController');


// Роуты для типов услуг
router.get('/', typeServiceController.getAll); // Получить все типы услуг
router.get('/:id', typeServiceController.getById); // Получить тип услуги по ID


module.exports = router;
