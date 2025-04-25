const Router = require("express"); // Импортируем библиотеку express для создания маршрутизатора
const router = new Router(); // Создаем новый экземпляр маршрутизатора

const logAction = require('../utils/logger'); // Импортируем логгер для записи логов
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

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
logAction('Добавлены роуты для работы с дисконтом по пути /discount', '✅');

router.use('/feedbacks', feedback_routes); // Роуты для работы с отзывами (путь: /feedbacks)
logAction('Добавлены роуты для работы с отзывами по пути /feedbacks', '✅');

router.use('/masters', masters_routes); // Роуты для работы с мастерами (путь: /masters)
logAction('Добавлены роуты для работы с мастерами по пути /masters', '✅');

router.use('/reqs', reqs_routes); // Роуты для работы с запросами (путь: /reqs)
logAction('Добавлены роуты для работы с запросами по пути /reqs', '✅');

router.use('/serv', services_routes); // Роуты для работы с услугами (путь: /serv)
logAction('Добавлены роуты для работы с услугами по пути /serv', '✅');

router.use('/types', serv_types_routes); // Роуты для работы с типами услуг (путь: /types)
logAction('Добавлены роуты для работы с типами услуг по пути /types', '✅');

router.use('/users', users_routes); // Роуты для работы с пользователями (путь: /users)
logAction('Добавлены роуты для работы с пользователями по пути /users', '✅');

router.use('/statuses', statuses_routes); // Роуты для работы с статусами (путь: /statuses)
logAction('Добавлены роуты для работы со статусами по пути /statuses', '✅');

// Нулевой путь для проверки соединения
router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: 'Сервер работает' });
        logAction('Запрос на проверку статуса сервера успешно выполнен.', '🟢');
    } catch (error) {
        logAction('Ошибка при проверке статуса сервера: ' + error.message, '❌');
        throw ApiError.internal('Ошибка при обработке запроса на проверку статуса сервера.');
    }
});

// Экспортируем маршрутизатор, чтобы его можно было использовать в других частях приложения
logAction('Маршрутизатор успешно настроен и готов к использованию.', '✅');
module.exports = router;
