const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Получение профиля мастера (только для мастера)
//router.get('/profile', authMiddleware, roleMiddleware('master'), masterController.getProfile);

// Получение среднего рейтинга мастера (только для мастера)
router.get('/rating', authMiddleware, roleMiddleware('client'), masterController.getAverageRating);

module.exports = router;