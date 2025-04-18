const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const typeServiceController = require('../controllers/serv_typesController'); // Импортируем контроллер для работы с типами услуг

// Роуты для типов услуг

// Роут для получения всех типов услуг
router.get('/', typeServiceController.getAll); 
// Этот маршрут вызывает метод getAll из контроллера, который возвращает список всех типов услуг.

// Роут для получения типа услуги по ID
router.get('/:service_type_id', typeServiceController.getById); 
// Этот маршрут вызывает метод getById из контроллера, который возвращает тип услуги по переданному ID.
// В запросе передается ID типа услуги, который будет использован для поиска в базе данных.

module.exports = router; 
// Экспортируем маршрутизатор, чтобы он был доступен в других частях приложения
