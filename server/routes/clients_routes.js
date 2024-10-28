const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


// Роуты для клиентов
router.get('/', clientController.getAll); // Получить всех клиентов
router.get('/:id', clientController.getById); // Получить клиента по ID
router.post('/',  clientController.create); // Создать клиента


module.exports = router;
