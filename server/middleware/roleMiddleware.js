const { Masters } = require('../modules/modules'); // Импортируем модель мастеров
const ApiError = require('../error/ApiError'); // Импортируем класс для обработки ошибок API
const logAction = require('../utils/logger'); // Импортируем логирование

// roleMiddleware принимает нужную роль (например, 'master') для доступа к ресурсу
function roleMiddleware(requiredRole) {
    return async (req, res, next) => {
        logAction(`🛡️ Проверка роли для пользователя с ID: ${req.user.id}, требуется роль: ${requiredRole}`);

        try {
            const userId = req.user.id; // Извлекаем userId из объекта req, который добавляется после прохождения authMiddleware

            let hasRole = false; // Переменная, которая будет указывать, имеет ли пользователь нужную роль
            if (requiredRole === 'master') {
                logAction(`🔍 Проверка роли 'master' для пользователя с ID: ${userId}`);
                const master = await Masters.findOne({ where: { user_id: userId } });
                hasRole = !!master; // Если мастер найден, hasRole станет true
                logAction(`✅ Найден мастер: ${hasRole}`);
            }

            if (!hasRole) {
                logAction('❌ Ошибка: Доступ запрещен, роль не найдена');
                return next(ApiError.forbidden('Доступ запрещен')); // Возвращаем ошибку 403 через ApiError
            }

            next(); // Если проверка роли прошла успешно, передаем управление следующему middleware или обработчику запроса
        } catch (error) {
            logAction(`🚨 Ошибка при проверке роли: ${error.message}`);
            return next(ApiError.internal('Ошибка сервера')); // Обрабатываем ошибку через ApiError
        }
    };
}

module.exports = roleMiddleware; // Экспортируем middleware для использования в других частях приложения
