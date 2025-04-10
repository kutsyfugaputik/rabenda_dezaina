const express = require('express'); // Импортируем библиотеку express для работы с маршрутизацией
const router = express.Router(); // Создаем новый объект маршрутизатора
const feedbackController = require('../controllers/feedbackController'); // Импортируем контроллер отзывов
const authMiddleware = require('../middleware/authMiddleware'); // Импортируем middleware для аутентификации пользователя



// Роуты для работы с отзывами
router.get('/', feedbackController.getAll); // Обработчик GET-запроса для получения всех отзывов
router.get('/:feedback_id', feedbackController.getById); // Обработчик GET-запроса для получения отзыва по его ID
router.post('/',authMiddleware, feedbackController.create); // Обработчик POST-запроса для создания нового отзыва


module.exports = router; // Экспортируем роутер, чтобы его можно было использовать в других частях приложения
