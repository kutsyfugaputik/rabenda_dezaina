const express = require('express'); // Импортируем библиотеку express для создания маршрутов
const router = express.Router(); // Создаем новый экземпляр маршрутизатора
const masterController = require('../controllers/masterController'); // Импортируем контроллер для работы с мастерами
const authMiddleware = require('../middleware/authMiddleware'); // Импортируем middleware для аутентификации пользователя
const roleMiddleware = require('../middleware/roleMiddleware'); // Импортируем middleware для проверки роли пользователя
const logAction = require('../utils/logger'); // Импортируем логгер для записи логов
const ApiError = require('../error/ApiError'); // Импортируем ApiError для обработки ошибок

// Роут для получения списка всех мастеров
router.get('/', async (req, res, next) => {
    try {
        logAction('Получен запрос на получение списка всех мастеров.', '📝'); // Логируем запрос на получение списка всех мастеров
        await masterController.getAll(req, res); // Вызов метода getAll контроллера для получения всех мастеров
        logAction('Список всех мастеров успешно возвращен.', '✅'); // Логируем успешный ответ
    } catch (error) {
        logAction(`Ошибка при получении списка мастеров: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении списка мастеров.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для получения примеров работ мастера, доступный только для клиентов
router.get('/:master_id/photos', authMiddleware, roleMiddleware('client'), async (req, res, next) => {
    try {
        logAction(`Получен запрос на получение примеров работ мастера с ID: ${req.params.master_id}.`, '📝'); // Логируем запрос на получение примеров работ
        await masterController.getExampleWorks(req, res); // Вызов метода getExampleWorks контроллера для получения примеров работ мастера
        logAction(`Примеры работ мастера с ID: ${req.params.master_id} успешно получены.`, '✅'); // Логируем успешный ответ
    } catch (error) {
        logAction(`Ошибка при получении примеров работ мастера с ID: ${req.params.master_id}: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при получении примеров работ мастера.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Роут для входа мастера
router.post('/login', async (req, res, next) => {
    try {
        logAction('Получен запрос на вход мастера.', '📝'); // Логируем запрос на вход мастера
        await masterController.loginMaster(req, res); // Вызов метода loginMaster контроллера для входа мастера
        logAction('Мастер успешно вошел в систему.', '✅'); // Логируем успешный вход
    } catch (error) {
        logAction(`Ошибка при входе мастера: ${error.message}`, '❌'); // Логируем ошибку
        next(ApiError.internal('Ошибка при входе мастера.')); // Обрабатываем ошибку с помощью ApiError
    }
});

// Экспортируем маршрутизатор, чтобы его можно было использовать в других частях приложения
module.exports = router;
