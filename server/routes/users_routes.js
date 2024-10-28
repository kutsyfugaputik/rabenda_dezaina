const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Импортируем контроллер пользователей


// Роуты для операций с пользователями
router.get('/',userController.getAll); // Получить всех пользователей (с авторизацией)
//router.get('/:id',  userController.getById); // Получить пользователя по ID (с авторизацией)
//router.post('/', userController.create); // Создать нового пользователя
//router.put('/:id',  userController.update); // Обновить данные пользователя (с авторизацией)
//router.delete('/:id',  userController.delete); // Удалить пользователя (с авторизацией)

module.exports = router;