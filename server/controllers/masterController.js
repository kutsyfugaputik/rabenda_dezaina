const { Masters } = require('../modules/modules');
// Импортируем модель `Masters`, которая представляет таблицу мастеров в базе данных.

const ApiError = require('../error/ApiError');
// Импортируем модуль `ApiError` для обработки ошибок, чтобы возвращать сообщения об ошибках с определенным статусом.

class MasterController {
    // Определяем класс `MasterController`, который содержит методы для работы с мастерами.

    async create(req, res, next) {
        // Асинхронный метод для создания нового мастера.

        console.log('Начато создание мастера...');
        // Логируем начало выполнения метода, чтобы отследить в терминале.

        const { user_id, specialization, years_of_experience, work_examples } = req.body;
        // Извлекаем из тела запроса (JSON) данные о мастере: ID пользователя, специализацию, стаж и примеры работ.

        console.log('Полученные данные:', { user_id, specialization, years_of_experience, work_examples });
        // Логируем полученные данные, чтобы видеть, какие данные переданы в метод.

        try {
            const master = await Masters.create({ user_id, specialization, years_of_experience, work_examples });
            // Используем метод `create` модели `Masters`, чтобы добавить запись о мастере в базу данных.

            console.log('Мастер успешно создан:', master);
            // Логируем успешное создание мастера, выводя объект созданного мастера.

            return res.json(master);
            // Возвращаем созданного мастера в формате JSON.
        } catch (error) {
            console.error('Ошибка при создании мастера:', error);
            // Логируем ошибку, если создание мастера завершилось сбоем.

            return next(ApiError.internal('Не удалось создать мастера'));
            // Передаем ошибку в обработчик ошибок с сообщением "Не удалось создать мастера".
        }
    }

    async getAll(req, res, next) {
        // Асинхронный метод для получения списка всех мастеров.

        console.log('Запрошен список всех мастеров...');
        // Логируем начало выполнения метода, чтобы отследить запрос.

        try {
            const masters = await Masters.findAll();
            // Используем метод `findAll` модели `Masters`, чтобы получить все записи мастеров из базы данных.

            console.log('Найдено мастеров:', masters.length);
            // Логируем количество найденных мастеров.

            return res.json(masters);
            // Возвращаем список мастеров в формате JSON.
        } catch (error) {
            console.error('Ошибка при получении списка мастеров:', error);
            // Логируем ошибку, если запрос завершился сбоем.

            return next(ApiError.internal('Не удалось получить список мастеров'));
            // Передаем ошибку в обработчик с сообщением "Не удалось получить список мастеров".
        }
    }

    async getAverageRating(req, res, next) {
        // Асинхронный метод для получения средней оценки мастера.

        console.log('Запрошена средняя оценка мастера...');
        // Логируем начало выполнения метода.

        const userId = req.user.id;
        // Получаем ID текущего пользователя из `req.user`. Это предполагает, что пользователь аутентифицирован.

        console.log('ID пользователя:', userId);
        // Логируем ID пользователя, чтобы убедиться, что он корректно передан.

        try {
            const master = await Masters.findOne({ where: { user_id: userId } });
            // Ищем мастера в базе данных по `user_id`.

            if (!master) {
                // Если мастер не найден:
                console.warn(`Мастер с user_id=${userId} не найден`);
                // Логируем предупреждение, что мастер не найден.

                return res.status(404).json({ message: 'Мастер не найден' });
                // Возвращаем ответ с кодом 404 и сообщением "Мастер не найден".
            }

            console.log('Мастер найден:', master);
            // Логируем информацию о найденном мастере.

            const requests = await master.getRequests({ include: ['feedback'] });
            // Получаем связанные с мастером запросы, включая отзывы (`feedback`).

            console.log('Найдено запросов с отзывами:', requests.length);
            // Логируем количество запросов, связанных с мастером.

            const ratings = requests
                .map(req => req.feedback?.rating)
                // Проходим по каждому запросу и извлекаем рейтинг отзыва, если он существует.

                .filter(rating => rating != null);
                // Убираем все `null` значения из массива рейтингов.

            console.log('Полученные оценки:', ratings);
            // Логируем массив полученных оценок.

            const averageRating = ratings.length
                ? ratings.reduce((sum, rate) => sum + rate, 0) / ratings.length
                // Если есть хотя бы одна оценка, вычисляем среднее арифметическое.
                : 'нет оценки';
                // Если оценок нет, возвращаем строку "нет оценки".

            console.log('Средняя оценка:', averageRating);
            // Логируем вычисленную среднюю оценку.

            return res.json({ averageRating });
            // Возвращаем среднюю оценку в формате JSON.
        } catch (error) {
            console.error('Ошибка при вычислении средней оценки:', error);
            // Логируем ошибку, если что-то пошло не так.

            return res.status(500).json({ message: 'Ошибка сервера' });
            // Возвращаем ответ с кодом 500 и сообщением "Ошибка сервера".
        }
    }
}

module.exports = new MasterController();
// Экспортируем экземпляр класса `MasterController`, чтобы его методы можно было использовать в маршрутах.
