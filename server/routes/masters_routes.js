const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Роуты для мастеров
router.get('/', masterController.getAllMasters); // Получить всех мастеров
router.get('/:id', masterController.getMasterById); // Получить мастера по ID
router.post('/', authMiddleware, masterController.createMaster); // Создать мастера
router.put('/:id', authMiddleware, masterController.updateMaster); // Обновить мастера
router.delete('/:id', authMiddleware, masterController.deleteMaster); // Удалить мастера

module.exports = router;