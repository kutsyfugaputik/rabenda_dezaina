// Импортируем модули, которые представляют сущности для клиента и мастера
const Client = require('../modules/modules');
const Master = require('../modules/modules');

// roleMiddleware принимает нужную роль (например, 'client' или 'master') для доступа к ресурсу
function roleMiddleware(requiredRole) {
    return async (req, res, next) => {
        // Логируем начало проверки роли
        console.log(`Проверка роли для пользователя с ID: ${req.user.id}, требуется роль: ${requiredRole}`);

        try {
            const userId = req.user.id; // Извлекаем userId из объекта req, который добавляется после прохождения authMiddleware

            let hasRole = false; // Переменная, которая будет указывать, имеет ли пользователь нужную роль.

            if (requiredRole === 'client') {
                // Если требуется роль 'client', проверяем, является ли пользователь клиентом.
                console.log(`Проверка роли клиента для пользователя с ID: ${userId}`);
                const client = await Client.findOne({ where: { user_id: userId } });
                hasRole = !!client;
                // Если клиент найден в базе, hasRole станет true.
                console.log(`Найден клиент: ${hasRole}`);
            } else if (requiredRole === 'master') {
                // Если требуется роль 'master', проверяем, является ли пользователь мастером.
                console.log(`Проверка роли мастера для пользователя с ID: ${userId}`);
                const master = await Master.findOne({ where: { user_id: userId } });
                hasRole = !!master;
                // Если мастер найден в базе, hasRole станет true.
                console.log(`Найден мастер: ${hasRole}`);
            }

            if (!hasRole) {
                // Если роль не найдена (hasRole false), возвращаем ошибку доступа.
                console.log('Ошибка: Доступ запрещен, роль не найдена');
                return res.status(403).json({ message: 'Доступ запрещен' });
                // Код 403 означает, что доступ запрещен.
            }

            next(); 
            // Если проверка роли прошла успешно, передаем управление следующему middleware или обработчику запроса.
        } catch (error) {
            console.error('Ошибка при проверке роли:', error); 
            // В случае ошибки выводим её в консоль.

            res.status(500).json({ message: 'Ошибка сервера' }); 
            // Если произошла ошибка на сервере, возвращаем код 500 и сообщение об ошибке.
        }
    };
}

module.exports = roleMiddleware;
// Экспортируем middleware для использования в других частях приложения.
