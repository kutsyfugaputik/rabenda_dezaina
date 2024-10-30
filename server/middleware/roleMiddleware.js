// middlewares/roleMiddleware.js
const Client = require('../models/Client');
const Master = require('../models/Master');

// roleMiddleware принимает нужную роль для доступа к ресурсу
function roleMiddleware(requiredRole) {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; // предполагается, что userId добавлен в req после прохождения authMiddleware

      let hasRole = false;

      if (requiredRole === 'client') {
        // Проверяем, является ли пользователь клиентом
        const client = await Client.findOne({ where: { user_id: userId } });
        hasRole = !!client;
      } else if (requiredRole === 'master') {
        // Проверяем, является ли пользователь мастером
        const master = await Master.findOne({ where: { user_id: userId } });
        hasRole = !!master;
      }

      if (!hasRole) {
        return res.status(403).json({ message: 'Доступ запрещен' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
}

module.exports = roleMiddleware;
