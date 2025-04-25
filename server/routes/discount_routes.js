const express = require('express'); // Импортируем библиотеку express для работы с маршрутизацией
const router = express.Router(); // Создаем новый объект маршрутизатора
const discountController = require('../controllers/discountController'); // Импортируем контроллер скидок

const logAction = require('../utils/logger'); // Импортируем логгер для записи логов
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

// Обработчик GET-запроса для получения всех скидок
router.get('/', async (req, res, next) => { 
    try {
        logAction('Получен запрос на получение всех скидок.', '📝'); // Логируем запрос на получение скидок
        await discountController.getAll(req, res); // Вызов метода getAll контроллера для получения всех скидок
        logAction('Все скидки успешно получены.', '✅'); // Логируем успешное выполнение запроса
    } catch (error) {
        logAction(`Ошибка при получении всех скидок: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении скидок.')); // Обрабатываем ошибку с помощью ApiError
    }
});

module.exports = router; // Экспортируем роутер, чтобы его можно было использовать в других частях приложения
