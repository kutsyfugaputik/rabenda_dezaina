const jwt = require('jsonwebtoken');

// Middleware для проверки авторизации через cookie
function authMiddleware(req, res, next) {
    console.log('Запрос на проверку авторизации через JWT');

    // Достаем токен из куки
    const token = req.cookies.token;
    console.log('Полученный токен из куки:', token);

    if (!token) {
        console.log('Ошибка: Токен не найден в куки');
        return res.status(401).json({ message: 'Необходима авторизация' });
    }

    try {
        // Декодируем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Токен успешно декодирован:', decoded);

        // Добавляем данные пользователя в req
        req.user = { id: decoded.id, role: decoded.role };

        // Передаем управление дальше
        next();
    } catch (error) {
        console.log('Ошибка при проверке токена:', error.message);
        res.status(401).json({ message: 'Неверный или истекший токен' });
    }
}

module.exports = authMiddleware;
