const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Импортируем контроллер пользователей


// Роуты для операций с пользователями
router.get('/',userController.getAllUsers); // Получить всех пользователей (с авторизацией)
router.get('/:id',  userController.getUserById); // Получить пользователя по ID (с авторизацией)
router.post('/', userController.createUser); // Создать нового пользователя
router.put('/:id',  userController.updateUser); // Обновить данные пользователя (с авторизацией)
router.delete('/:id',  userController.deleteUser); // Удалить пользователя (с авторизацией)

module.exports = router;