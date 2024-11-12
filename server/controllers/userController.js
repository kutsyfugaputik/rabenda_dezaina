// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Users, Clients } = require('../modules/modules');

class userController {
  async register(req, res) {
    let { first_name, last_name, father_name, email, phone, birhtday, password } = req.body;
    console.log(req.body);
    if (!password) {
      return res.status(400).json({ message: 'Пароль обязателен' });
    }

    // Проверка и форматирование даты
    if (birhtday) {
      const formattedDate = moment(birhtday, 'DD.MM.YYYY', true);
      if (!formattedDate.isValid()) {
        return res.status(400).json({ message: 'Неверный формат даты рождения' });
      }
      birhtday = formattedDate.format('YYYY-MM-DD');
    }


    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await Users.create({
        first_name,
        last_name,
        father_name,
        email,
        phone,
        birhtday,  // Corrected field name
        password: hashedPassword
      });
      const Client = await Clients.create({user_id:newUser.user_id});
      res.status(201).json(newUser);
      res.status(201).json(Client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email } });
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
    res.json({ message: 'Выход выполнен' });
  }
}

module.exports = new userController();