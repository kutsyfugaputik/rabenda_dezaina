// routes/user_routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Роут для регистрации
router.post('/register', userController.register);

// Роут для входа
router.post('/login', userController.login);

// Роут для выхода
router.post('/logout', userController.logout);

module.exports = router;