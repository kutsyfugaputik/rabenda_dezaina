const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');


// Роуты для мастеров
router.get('/', masterController.getAll); // Получить всех мастеров
router.get('/:id', masterController.getById); // Получить мастера по ID
router.post('/',  masterController.create); // Создать мастера


module.exports = router;