const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const masterController = require('../controllers/masterController'); // Импортируем контроллер для работы с мастерами
const authMiddleware = require('../middleware/authMiddleware'); // Импортируем middleware для аутентификации пользователя


// Роут для получения списка всех мастеров
router.get('/', masterController.getAll); // Этот маршрут возвращает всех мастеров, доступен для всех пользователей.

// Роут для получения среднего рейтинга мастера, доступный только клиентам, после прохождения аутентификации (переделать)
router.get('/:master_id/photos', masterController.getExampleWorks);
// Этот маршрут сначала проверяет, авторизован ли пользователь (authMiddleware), затем проверяет, является ли он клиентом (roleMiddleware('client')),
// и если все проверки прошли успешно, возвращается средний рейтинг мастера.
// Роут для входа пользователя
router.post('/login', masterController.loginMaster);
// Этот маршрут вызывает метод login из контроллера, который обрабатывает процесс входа пользователя, проверяет учетные данные и создает сессию.

// Экспортируем маршрутизатор, чтобы он был доступен в других частях приложения
module.exports = router;
 