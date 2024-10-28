const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');


// Роуты для мастеров
router.get('/', feedbackController.getAll); // Получить всех
router.get('/:id', feedbackController.getById); // Получить по ID
router.post('/',  feedbackController.create); // Создать 


module.exports = router;