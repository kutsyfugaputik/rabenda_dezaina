// Импортируем необходимые модули и утилиты
const { Masters, Users } = require('../modules/modules'); // Импорт моделей Masters и Users для взаимодействия с базой данных.
const ApiError = require('../error/ApiError'); // Класс для генерации API-ошибок с HTTP статусами.
const bcrypt = require('bcrypt'); // Пакет для сравнения хешированных паролей.
const jwt = require('jsonwebtoken'); // Пакет для создания и проверки JWT-токенов.
const logAction = require('..//utils/logger'); // Утилита для логирования действий в файл и консоль.
const fs = require('fs'); // Модуль файловой системы.
const path = require('path'); // Модуль для работы с путями.
const db = require('../modules/db'); // Подключение к базе данных, если необходимо для прямых запросов.

class MasterController {
    // Метод авторизации мастера
    async loginMaster(req, res, next) {
        const { email, password } = req.body; // Получаем email и пароль из тела запроса
        logAction(`Запрос на авторизацию мастера: ${email}`, '📥'); // Логируем начало авторизации

        try {
            logAction('Поиск пользователя по email...', '🔍'); // Лог поиска пользователя
            const user = await Users.findOne({ where: { email } }); // Поиск пользователя в таблице Users

            if (!user) {
                logAction(`Пользователь не найден: ${email}`, '❌'); // Лог — пользователь не найден
                throw ApiError.badRequest('Неверный email или пароль'); // Ошибка — 400
            }

            logAction(`Пользователь найден (id=${user.user_id}). Проверка пароля...`, '✅'); // Лог — найден пользователь
            const isPasswordValid = await bcrypt.compare(password, user.password); // Сравниваем введённый пароль с хешем

            if (!isPasswordValid) {
                logAction(`Неверный пароль для пользователя ${email}`, '❌'); // Лог — неправильный пароль
                throw ApiError.badRequest('Неверный email или пароль'); // Ошибка — 400
            }

            logAction('Проверка роли: мастер...', '🔍'); // Лог — проверка роли
            const master = await Masters.findOne({ where: { user_id: user.user_id } }); // Ищем мастера по user_id

            if (!master) {
                logAction(`Пользователь ${user.user_id} не является мастером`, '❌'); // Лог — не мастер
                throw ApiError.forbidden('Доступ запрещён'); // Ошибка — 403
            }

            logAction('Генерация JWT токена...', '🔐'); // Лог — генерация токена
            const token = jwt.sign(
                { id: user.user_id, role: 'master' }, // Данные для токена
                process.env.JWT_SECRET, // Секрет для подписи
                { expiresIn: '1h' } // Время жизни — 1 час
            );

            logAction('Установка куки с токеном...', '🍪'); // Лог — установка куки
            res.cookie('token', token, {
                httpOnly: true, // Только через HTTP
                secure: true, // Только через HTTPS
                sameSite: 'Strict', // Без межсайтовых запросов
                maxAge: 3600000, // Время жизни — 1 час
            });

            logAction(`Мастер ${user.user_id} успешно вошёл`, '✅'); // Лог — успех
            return res.json({ message: 'Успешный вход мастера' }); // Ответ клиенту
        } catch (error) {
            logAction(`Ошибка авторизации мастера: ${error.message}`, '🔥'); // Лог ошибки
            return next(ApiError.internal('Ошибка авторизации мастера')); // Ошибка 500 через ApiError
        }
    }

    // Метод получения всех мастеров
    async getAll(req, res, next) {
        logAction('Запрошен список всех мастеров...', '📄'); // Лог — начало запроса

        try {
            const masters = await Masters.findAll(); // Получаем всех мастеров
            logAction(`Найдено мастеров: ${masters.length}`, '✅'); // Лог — сколько найдено
            return res.json(masters); // Отправляем массив мастеров
        } catch (error) {
            logAction(`Ошибка при получении мастеров: ${error.message}`, '🔥'); // Лог ошибки
            return next(ApiError.internal('Не удалось получить список мастеров')); // Ошибка 500 через ApiError
        }
    }

    // Метод получения примеров работ мастера
    async getExampleWorks(req, res, next) {
        try {
            const master_id = req.params.master_id; // Извлекаем id мастера из параметров

            if (!master_id) {
                logAction('master_id не передан в запросе', '❌'); // Лог — не передан id
                throw ApiError.badRequest('master_id не передан'); // Ошибка 400
            }

            logAction(`Запрос на примеры работ мастера с id: ${master_id}`, '📥'); // Лог запроса
            const result = await db.query(
                'SELECT work_examples FROM masters WHERE master_id = $1',
                {
                    bind: [master_id],
                    type: db.QueryTypes.SELECT,
                }
            );

            if (!result || result.length === 0) {
                logAction(`Мастер с id ${master_id} не найден`, '❌'); // Лог — мастер не найден
                throw ApiError.notFound('Мастер не найден'); // Ошибка 404
            }

            const masterFolderPath = result[0].work_examples; // Путь к работам
            const fullPath = path.resolve(__dirname, '..', masterFolderPath); // Формируем абсолютный путь

            if (!fs.existsSync(fullPath)) {
                logAction(`Папка не найдена для мастера ${master_id}`, '❌'); // Лог — папки нет
                throw ApiError.notFound('Папка с фото не найдена'); // Ошибка 404
            }

            const files = fs.readdirSync(fullPath); // Получаем список файлов
            if (files.length === 0) {
                logAction(`Файлы не найдены в папке мастера ${master_id}`, '❌'); // Лог — нет файлов
                throw ApiError.notFound('Файлы не найдены'); // Ошибка 404
            }

            const imageUrls = files.map(file => {
                return `${req.protocol}://${req.get('host')}/${masterFolderPath}/${file}`; // Формируем URL'ы
            });

            logAction(`Примеры работ мастера ${master_id} загружены`, '✅'); // Лог — успех
            res.json({ imageUrls }); // Отправляем список URL'ов
        } catch (error) {
            logAction(`Ошибка получения примеров работ: ${error.message}`, '🔥'); // Лог ошибки
            return next(ApiError.internal('Ошибка при получении примеров работ')); // Ошибка 500 через ApiError
        }
    }
}

// Экспортируем готовый экземпляр контроллера
module.exports = new MasterController();
