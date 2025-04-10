const { Feedback } = require('../modules/modules'); 
// Импортируем модель `Feedback` из файла `modules/modules`. 
// Эта модель отвечает за взаимодействие с таблицей обратной связи в базе данных.

const ApiError = require('../error/ApiError'); 
// Импортируем объект `ApiError`, который используется для обработки ошибок.
// Вероятно, он позволяет возвращать ошибки с подробным описанием и соответствующим HTTP-кодом.

class FeedbackController { 
    // Класс `FeedbackController` содержит методы для работы с сущностью обратной связи (feedback).

    async create(req, res) { 
        // Асинхронный метод для создания нового отзыва.

        console.log('Запрос на создание нового отзыва...');
        // Логируем начало процесса создания нового отзыва.

        const { rating, text } = req.body; 
        // Извлекаем значения `rating` (оценка) и `text` (текст отзыва) из тела запроса.

        try {
            const feedback = await Feedback.create({ rating, text }); 
            // Используем метод `create` модели `Feedback` для создания новой записи в базе данных.
            // Передаём в метод объект с ключами `rating` и `text`.

            console.log(`Создан новый отзыв: ${JSON.stringify(feedback)}`);
            // Логируем успешное создание отзыва с его данными.

            return res.json(feedback); 
            // Возвращаем созданный отзыв в формате JSON в ответ на запрос клиента.
        } catch (error) {
            console.error('Ошибка при создании отзыва:', error);
            // Логируем ошибку, если процесс создания отзыва завершился неудачей.

            return res.status(500).json({ message: 'Ошибка сервера при создании отзыва' });
            // Возвращаем ошибку сервера клиенту.
        }
    }

    async getAll(req, res) { 
        // Асинхронный метод для получения всех отзывов.

        console.log('Запрос на получение всех отзывов...');
        // Логируем начало процесса получения всех отзывов.

        try {
            const feedbacks = await Feedback.findAll(); 
            // Используем метод `findAll` модели `Feedback` для извлечения всех записей из базы данных.

            console.log(`Найдено отзывов: ${feedbacks.length}`);
            // Логируем количество найденных отзывов.

            return res.json(feedbacks); 
            // Возвращаем список всех отзывов в формате JSON в ответ на запрос клиента.
        } catch (error) {
            console.error('Ошибка при получении отзывов:', error);
            // Логируем ошибку, если процесс получения отзывов завершился неудачей.

            return res.status(500).json({ message: 'Ошибка сервера при получении отзывов' });
            // Возвращаем ошибку сервера клиенту.
        }
    }

    async getById(req, res, next) { 
        // Асинхронный метод для получения конкретного отзыва по его `id`.

        console.log(`Запрос на получение отзыва с ID: ${req.params.feedback_id}`);
        // Логируем начало процесса получения отзыва по ID.

        const { feedback_id } = req.params; 
        // Извлекаем параметр `id` из URL запроса. Обычно он передаётся как часть маршрута, например, `/feedback/:id`.

        try {
            const feedback = await Feedback.findOne({ where: { feedback_id} }); 
            // Используем метод `findOne` модели `Feedback` для поиска записи по указанному `id`.
            // Условие поиска задаётся через объект `{ where: { feedback_id } }`.

            if (!feedback) { 
                // Проверяем, существует ли отзыв с данным `feedback_id`.

                console.warn(`Отзыв с ID ${feedback_id} не найден`);
                // Логируем предупреждение, если отзыв не найден.

                return next(ApiError.notFound('Feedback not found')); 
                // Если отзыв не найден, вызываем следующий middleware с пользовательской ошибкой 404.
            }

            console.log(`Отзыв с ID ${feedback_id} найден: ${JSON.stringify(feedback)}`);
            // Логируем найденный отзыв.

            return res.json(feedback); 
            // Если отзыв найден, возвращаем его в формате JSON в ответ клиенту.
        } catch (error) {
            console.error(`Ошибка при получении отзыва с ID ${id}:`, error);
            // Логируем ошибку, если процесс получения отзыва завершился неудачей.

            return res.status(500).json({ message: 'Ошибка сервера при получении отзыва' });
            // Возвращаем ошибку сервера клиенту.
        }
    }
}

module.exports = new FeedbackController(); 
// Экспортируем экземпляр класса `FeedbackController`.
// Это позволяет сразу использовать его методы в маршрутах без необходимости создания экземпляра.
