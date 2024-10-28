const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController'); // Импортируем контроллер для услуг


// Роуты для операций с услугами
router.get('/', serviceController.getAll); // Получить все услуги
router.get('/:id', serviceController.getById); // Получить услугу по ID авторизацией)

module.exports = router;
