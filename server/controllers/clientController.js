// controllers/clientsController.js
const { Client, User } = require('../models');

class clientsController{
async  getClientProfile(req, res) {
  const userId = req.user.id;
  
  try {
    const client = await Client.findOne({
      where: { user_id: userId },
      include: [{ model: User, attributes: ['first_name', 'last_name', 'email', 'phone'] }]
    });

    if (!client) {
      return res.status(404).json({ message: 'Клиент не найден' });
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}
}
module.exports = clientsController;