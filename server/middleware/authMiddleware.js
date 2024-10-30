// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Ожидаем формат 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Необходима авторизация' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Добавляем userId в req
    next();
  } catch (error) {
    res.status(401).json({ message: 'Неверный токен' });
  }
}

module.exports = authMiddleware;
