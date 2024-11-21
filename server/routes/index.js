const Router = require("express"); // Импортируем библиотеку express для создания маршрутизатора
const router = new Router; // Создаем новый экземпляр маршрутизатора

// Импортируем все роуты, которые будут использоваться в приложении
const discount_routes = require('../routes/discount_routes');
const feedback_routes = require('../routes/feedback_routes');
const masters_routes = require('../routes/masters_routes');
const reqs_routes = require('../routes/reqs_routes');
const serv_types_routes = require('../routes/serv_types_routes');
const services_routes = require('../routes/services_routes');
const statuses_routes = require('../routes/statuses_routes');
const users_routes = require('../routes/users_routes');

// Добавляем роуты в общий маршрутизатор, используя метод .use() для указания пути и соответствующего обработчика
router.use('/discount', discount_routes); // Роуты для работы с дисконтом (путь: /discount)
router.use('/feedbacks', feedback_routes); // Роуты для работы с отзывами (путь: /feedbacks)
router.use('/masters', masters_routes); // Роуты для работы с мастерами (путь: /masters)
router.use('/reqs', reqs_routes); // Роуты для работы с запросами (путь: /reqs)
router.use('/serv', services_routes); // Роуты для работы с услугами (путь: /serv)
router.use('/types', serv_types_routes); // Роуты для работы с типами услуг (путь: /types)
router.use('/users', users_routes); // Роуты для работы с пользователями (путь: /users)
router.use('/statuses', statuses_routes); // Роуты для работы с статусами (путь: /statuses)

// Экспортируем маршрутизатор, чтобы его можно было использовать в других частях приложения
module.exports = router;
