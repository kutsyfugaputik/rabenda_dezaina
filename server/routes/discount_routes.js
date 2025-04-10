const express = require('express'); // Импортируем библиотеку express для работы с маршрутизацией
const router = express.Router(); // Создаем новый объект маршрутизатора
const discountController = require('../controllers/discountController'); // Импортируем контроллер скидок

// Обработчик GET-запроса для получения всех скидок
router.get('/', discountController.getAll); 
// Когда приходит GET-запрос на /, вызывается метод getAll контроллера, который отвечает за получение всех скидок

module.exports = router; // Экспортируем роутер, чтобы его можно было использовать в других частях приложения
 