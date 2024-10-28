const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Роуты для клиентов
router.get('/', clientController.getAllClients); // Получить всех клиентов
router.get('/:id', clientController.getClientById); // Получить клиента по ID
router.post('/', authMiddleware, clientController.createClient); // Создать клиента
router.put('/:id', authMiddleware, clientController.updateClient); // Обновить клиента
router.delete('/:id', authMiddleware, clientController.deleteClient); // Удалить клиента

module.exports = router;
