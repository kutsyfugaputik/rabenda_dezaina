// Импорт модели обратной связи (отзывов)
const { Feedback, Requests } = require('../modules/modules');

// Импорт пользовательского обработчика ошибок
const ApiError = require('../error/ApiError');

// Импорт логгера для записи действий
const logAction = require('../utils/logger');

class FeedbackController {
    // Метод: создание нового отзыва и привязка к заявке
    async create(req, res, next) {
        logAction('Запрос на создание нового отзыва', '📝');

        const { rating, text, request_id } = req.body; // Извлекаем данные из запроса

        try {
            // Создание отзыва в базе данных
            const feedback = await Feedback.create({ rating, text });
            logAction(`Создан отзыв: ${JSON.stringify(feedback)}`, '✅');

            // Привязка отзыва к заявке (обновление поля feedback_id)
            const updated = await Requests.update(
                { feedback_id: feedback.feedback_id },
                { where: { request_id } }
            );

            if (updated[0] === 0) {
                logAction(`Заявка с ID ${request_id} не найдена`, '⚠️');
                return next(ApiError.notFound('Заявка не найдена для привязки отзыва'));
            }

            return res.json({
                message: 'Отзыв создан и привязан к заявке',
                feedback
            });
        } catch (error) {
            logAction(`Ошибка при создании отзыва: ${error.message}`, '❌');
            return next(ApiError.internal('Ошибка сервера при создании отзыва'));
        }
    }

    // Метод: получить все отзывы
    async getAll(req, res, next) {
        logAction('Запрос на получение всех отзывов', '📥');

        try {
            const feedbacks = await Feedback.findAll(); // Получаем все отзывы
            logAction(`Найдено отзывов: ${feedbacks.length}`, '🔍');

            return res.json(feedbacks);
        } catch (error) {
            logAction(`Ошибка при получении отзывов: ${error.message}`, '❌');
            return next(ApiError.internal('Ошибка сервера при получении отзывов'));
        }
    }

    // Метод: получить отзыв по ID
    async getById(req, res, next) {
        const { feedback_id } = req.params;
        logAction(`Запрос на получение отзыва с ID ${feedback_id}`, '📥');

        try {
            const feedback = await Feedback.findOne({ where: { feedback_id } });

            if (!feedback) {
                logAction(`Отзыв с ID ${feedback_id} не найден`, '⚠️');
                return next(ApiError.notFound('Отзыв не найден'));
            }

            logAction(`Отзыв найден: ${JSON.stringify(feedback)}`, '✅');
            return res.json(feedback);
        } catch (error) {
            logAction(`Ошибка при получении отзыва с ID ${feedback_id}: ${error.message}`, '❌');
            return next(ApiError.internal('Ошибка сервера при получении отзыва'));
        }
    }
}

module.exports = new FeedbackController();
