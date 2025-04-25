// Импортируем модель скидок из модуля с БД
const { Discounts } = require('../modules/modules');

// Импортируем пользовательский класс ошибок
const ApiError = require('../error/ApiError');

// Импортируем логгер для записи логов в файл и в консоль
const logAction = require('../utils/logger');

// Класс-контроллер для управления скидками
class DiscountController {
    // Метод: получить все скидки
    async getAll(req, res, next) {
        logAction('Запрос на получение всех скидок', '📥'); // Логируем действие

        try {
            const discounts = await Discounts.findAll(); // Получаем все скидки из БД

            logAction(`Найдено скидок: ${discounts.length}`, '🔍'); // Логируем количество
            return res.json(discounts); // Отправляем клиенту данные
        } catch (error) {
            logAction(`Ошибка при получении всех скидок: ${error.message}`, '❌'); // Логируем ошибку
            return next(ApiError.internal('Ошибка сервера при получении всех скидок')); // Прокидываем в middleware
        }
    }

    // Метод: получить скидку по ID
    async getById(req, res, next) {
        const { id } = req.params; // Получаем ID из параметров маршрута
        logAction(`Запрос на получение скидки с ID: ${id}`, '📥'); // Логируем начало запроса

        try {
            const discount = await Discounts.findOne({ where: { id } }); // Ищем скидку по ID

            if (!discount) {
                logAction(`Скидка с ID ${id} не найдена`, '⚠️'); // Логируем, если не нашли
                return next(ApiError.notFound('Скидка не найдена')); // Прокидываем 404 ошибку
            }

            logAction(`Скидка с ID ${id} найдена: ${JSON.stringify(discount)}`, '✅'); // Логируем успех
            return res.json(discount); // Возвращаем скидку клиенту
        } catch (error) {
            logAction(`Ошибка при получении скидки с ID ${id}: ${error.message}`, '❌'); // Логируем ошибку
            return next(ApiError.internal('Ошибка сервера при получении скидки')); // Прокидываем в middleware
        }
    }
}

// Экспортируем экземпляр контроллера
module.exports = new DiscountController();
