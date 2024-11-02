// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Clients } = require('../modules/modules');

class userController {
  async register(req, res) {
    const { first_name, last_name, father_name, email, phone, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        first_name,
        last_name,
        father_name,
        email,
        phone,
        password: hashedPassword
      });
      
      const newClient = await Clients.create({ user_id: newUser.user_id });
      
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async logout(req, res) {
    // Обычно обработка выхода происходит на клиенте, удаляя токен
    res.json({ message: 'Выход выполнен' });
  }
}

module.exports = new userController();