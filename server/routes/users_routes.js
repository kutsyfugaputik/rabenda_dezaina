// routes/user_routes.js

const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const userController = require('../controllers/userController'); // Импортируем контроллер для работы с пользователями
const adminAuthMiddleware = require('../middleware/adminMiddleware'); // Импортируем middleware для проверки прав администратора

// Роут для входа в административную панель (требуется авторизация администратора)
router.post('/adminka', adminAuthMiddleware, userController.logAdmin);
// Этот маршрут вызывает метод logAdmin из контроллера userController, и доступ к нему будет только у пользователей с правами администратора.

// Роут для получения всех пользователей
router.get('/', userController.getAll);
// Этот маршрут вызывает метод getAll из контроллера, который возвращает список всех пользователей.

// Роут для регистрации пользователя
router.post('/register', userController.register);
// Этот маршрут вызывает метод register из контроллера, который занимается регистрацией нового пользователя.

// Роут для входа пользователя
router.post('/login', userController.login);
// Этот маршрут вызывает метод login из контроллера, который обрабатывает процесс входа пользователя, проверяет учетные данные и создает сессию.

// Роут для выхода пользователя
router.post('/logout', userController.logout);
// Этот маршрут вызывает метод logout из контроллера, который завершает сессию пользователя, осуществляя выход из системы.

module.exports = router; 
// Экспортируем маршрутизатор, чтобы он был доступен для использования в других частях приложения.
