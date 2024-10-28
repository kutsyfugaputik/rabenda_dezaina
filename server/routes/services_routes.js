const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController'); // Импортируем контроллер для услуг
const { authMiddleware } = require('../middleware/authMiddleware'); // Импортируем middleware для аутентификации

// Роуты для операций с услугами
router.get('/', serviceController.getAllServices); // Получить все услуги
router.get('/:id', serviceController.getServiceById); // Получить услугу по ID авторизацией)

module.exports = router;
