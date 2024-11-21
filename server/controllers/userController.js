const bcrypt = require('bcrypt');  // Подключение библиотеки для хеширования паролей
const jwt = require('jsonwebtoken');  // Подключение библиотеки для генерации JSON Web Token (JWT)
const moment = require('moment');  // Подключение библиотеки для работы с датами
const { Users, Clients } = require('../modules/modules');  // Импорт моделей Users и Clients из модуля

class UserController {
  // Метод для регистрации нового пользователя
  async register(req, res) {
    try {
        // Логирование входящих данных
        console.log('Запрос на регистрацию пользователя получен');
        console.log('Тело запроса:', req.body);
        
        // Деструктуризация данных из тела запроса
        const { first_name, last_name, father_name, email, phone, birthday, password } = req.body;  

        // Проверка наличия обязательных полей
        if (!password) {
            console.log('Ошибка: отсутствие пароля');
            return res.status(400).json({ message: 'Пароль обязателен' });
        }

        if (!email || !first_name || !last_name) {
            console.log('Ошибка: отсутствуют обязательные поля');
            return res.status(400).json({ message: 'Обязательные поля: email, имя, фамилия' });
        }

        // Проверка и форматирование даты рождения
        let formattedBirthday = null;
        if (birthday) {  // Если дата рождения присутствует в запросе
            console.log('Пытаемся отформатировать дату рождения:', birthday);
            const date = moment(birthday, 'DD.MM.YYYY', true);
            if (!date.isValid()) {
                console.log('Ошибка: Неверный формат даты рождения');
                return res.status(400).json({ message: 'Неверный формат даты рождения. Используйте DD.MM.YYYY' });
            }
            formattedBirthday = date.format('YYYY-MM-DD');
            console.log('Дата рождения отформатирована:', formattedBirthday);
        }

        // Хеширование пароля
        const saltRounds = 10;
        console.log('Хешируем пароль с использованием saltRounds:', saltRounds);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Пароль успешно захеширован');

        // Создание пользователя в базе данных
        console.log('Создаем нового пользователя в базе данных');
        const newUser = await Users.create({
            first_name,
            last_name,
            father_name,
            email,
            phone,
            birthday: formattedBirthday,
            password: hashedPassword,
        });

        // Создание записи клиента, связанной с пользователем
        console.log('Создаем запись клиента для пользователя');
        const client = await Clients.create({ user_id: newUser.user_id });

        // Ответ с созданными данными
        console.log('Пользователь и клиент успешно созданы');
        return res.status(201).json({
            user: newUser,
            client,
        });
    } catch (error) {
        console.error('Ошибка в методе register:', error);

        // Проверка на уникальность email в базе данных
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.log('Ошибка: email уже используется');
            return res.status(400).json({ message: 'Email уже используется' });
        }

        // Общий обработчик ошибок
        console.log('Ошибка сервера при регистрации');
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Метод для авторизации пользователя
  async login(req, res) {
    // Деструктуризация данных для получения email и пароля
    const { email, password } = req.body;
    console.log('Запрос на авторизацию пользователя получен');
    console.log('Тело запроса:', req.body);

    try {
      // Поиск пользователя в базе данных по email
      console.log('Ищем пользователя по email:', email);
      const user = await Users.findOne({ where: { email } });

      // Если пользователь не найден или пароли не совпадают, возвращаем ошибку авторизации
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log('Ошибка: неверный email или пароль');
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      // Генерация JWT токена
      console.log('Генерация JWT токена для пользователя с ID:', user.user_id);
      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      // Отправка токена в ответе на успешную авторизацию
      console.log('JWT токен успешно сгенерирован');
      return res.json({ token });
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      console.log('Ошибка сервера при авторизации');
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  // Метод для получения всех пользователей
  async getAll(req, res) {
    try {
      console.log('Запрос на получение всех пользователей');
      const users = await Users.findAll();
      console.log('Список пользователей успешно получен');
      return res.json(users);
    } catch (error) {
      console.error('Ошибка при получении всех пользователей:', error);
      console.log('Ошибка сервера при получении списка пользователей');
      return res.status(500).json({ message: 'Ошибка при получении всех пользователей' });
    }
  }

  // Метод для проверки роли администратора (тестовый пример)
  async logAdmin(req, res) {
    console.log('Запрос на проверку роли администратора');
    return res.json({ message: 'true' });
  }

  // Метод для выхода пользователя
  async logout(req, res) {
    console.log('Запрос на выход пользователя');
    return res.json({ message: 'Выход выполнен' });
  }
}

// Экспорт экземпляра контроллера для использования в других частях приложения
module.exports = new UserController();
