const bcrypt = require('bcrypt'); // Для хеширования пароля
const jwt = require('jsonwebtoken'); // Для создания JWT
const moment = require('moment'); // Для парсинга и форматирования даты
const { Users, Clients } = require('../modules/modules'); // Модели пользователей и клиентов
const ApiError = require('../error/ApiError'); // Кастомный обработчик ошибок
const logAction = require('../utils/logger'); // Функция логирования

class UserController {
  // Регистрация нового пользователя
  async register(req, res, next) {
    logAction('📩 Получен запрос на регистрацию пользователя');
    const { first_name, last_name, father_name, email, phone, birthday, password } = req.body;

    // Валидация обязательных полей
    if (!password) return next(ApiError.badRequest('Пароль обязателен'));
    if (!email || !first_name || !last_name) {
      return next(ApiError.badRequest('Обязательные поля: email, имя, фамилия'));
    }

    // Обработка и валидация даты рождения
    let formattedBirthday = null;
    if (birthday) {
      const date = moment(birthday, 'DD.MM.YYYY', true);
      if (!date.isValid()) return next(ApiError.badRequest('Неверный формат даты рождения. Используйте DD.MM.YYYY'));
      formattedBirthday = date.format('YYYY-MM-DD');
    }

    try {
      // Хеширование пароля
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Создание пользователя
      const newUser = await Users.create({
        first_name,
        last_name,
        father_name,
        email,
        phone,
        birthday: formattedBirthday,
        password: hashedPassword,
      });

      // Создание клиента
      const client = await Clients.create({ user_id: newUser.user_id });

      logAction(`✅ Новый пользователь (${newUser.user_id}) и клиент успешно созданы`);
      return res.status(201).json({ user: newUser, client });
    } catch (error) {
      logAction(`❌ Ошибка при регистрации: ${error.message}`, '🚨');
      if (error.name === 'SequelizeUniqueConstraintError') {
        return next(ApiError.badRequest('Email уже используется'));
      }
      return next(ApiError.internal('Ошибка сервера при регистрации'));
    }
  }

  // Авторизация клиента
  async loginClient(req, res, next) {
    const { email, password } = req.body;
    logAction(`🔐 Авторизация клиента: ${email}`);

    try {
      const user = await Users.findOne({ where: { email } });
      if (!user) return next(ApiError.unauthorized('Неверный email или пароль'));

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return next(ApiError.unauthorized('Неверный email или пароль'));

      const client = await Clients.findOne({ where: { user_id: user.user_id } });
      if (!client) return next(ApiError.forbidden('Доступ запрещен'));

      // Генерация JWT
      const token = jwt.sign({ id: user.user_id, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Установка токена в cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 3600000,
      });

      logAction(`✅ Клиент ${user.user_id} успешно вошел`);
      return res.json({ message: 'Успешный вход клиента',
        client_id: client});
    } catch (error) {
      logAction(`❌ Ошибка авторизации: ${error.message}`, '🚨');
      return next(ApiError.internal('Ошибка сервера'));
    }
  }

  // Выход
  logout(req, res) {
    res.clearCookie('token');
    logAction('🚪 Пользователь вышел из системы');
    res.json({ message: 'Вы успешно вышли' });
  }

  // Получение всех пользователей
  async getAll(req, res, next) {
    logAction('📄 Запрос на получение всех пользователей');
    try {
      const users = await Users.findAll();
      logAction(`✅ Получено ${users.length} пользователей`);
      return res.json(users);
    } catch (error) {
      logAction(`❌ Ошибка получения пользователей: ${error.message}`, '🚨');
      return next(ApiError.internal('Ошибка при получении всех пользователей'));
    }
  }

  // Проверка роли администратора (заглушка)
  async logAdmin(req, res) {
    logAction('🛡️ Проверка доступа администратора');
    return res.json({ message: 'true' });
  }
}

module.exports = new UserController();
