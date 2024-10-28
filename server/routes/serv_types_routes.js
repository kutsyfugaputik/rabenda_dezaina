const express = require('express');
const router = express.Router();
const typeServiceController = require('../controllers/serv_typesController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Роуты для типов услуг
router.get('/', typeServiceController.getAllTypeServices); // Получить все типы услуг
router.get('/:id', typeServiceController.getTypeServiceById); // Получить тип услуги по ID


module.exports = router;
