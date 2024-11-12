const { DataTypes } = require('sequelize'); 
// Из модуля 'sequelize' импортируем объект DataTypes, который содержит типы данных для создания полей в таблице.

const sequelize = require('../db'); 
// Подключаем экземпляр Sequelize, который настроен для взаимодействия с базой данных. Путь к файлу конфигурации может быть другим, в зависимости от структуры проекта.

// Users Model
const Users = sequelize.define('Users', { 
  // Определяем модель для таблицы 'Users'. Метод 'define' создаёт модель, которая будет соответствовать таблице в базе данных.

    user_id: { 
      type: DataTypes.INTEGER, 
      // Тип данных для поля 'user_id' — целое число.
      autoIncrement: true, 
      // Устанавливаем автоинкремент, чтобы значение 'user_id' увеличивалось автоматически при добавлении новой записи.
      primaryKey: true, 
      // Устанавливаем это поле как первичный ключ.
    },

    first_name: { 
      type: DataTypes.STRING(100), 
      // Тип данных для поля 'first_name' — строка длиной до 100 символов.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения (не может быть пустым).
    },

    last_name: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      // Поле 'last_name' также обязательно для заполнения.
    },

    father_name: { 
      type: DataTypes.STRING(100), 
      allowNull: true, 
      // Поле 'father_name' необязательно, может быть пустым.
    },

    email: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      // Поле 'email' обязательно для заполнения и ограничено 100 символами.
    },

    phone: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      // Поле 'phone' также обязательно для заполнения.
    },

    password: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      // Поле 'password' обязательно для заполнения.
    },

    birhtday: { 
      type: DataTypes.DATE, 
      // Поле 'birhtday' будет иметь тип данных DATE, то есть дата.
      allowNull: false, 
      // Поле 'birthday' обязательно для заполнения.
    },

  }, {
    tableName: 'users', 
    // Устанавливаем название таблицы в базе данных, которое будет соответствовать модели. Здесь таблица называется 'users'.
    timestamps: false, 
    // Указываем, что не нужно автоматически добавлять столбцы 'createdAt' и 'updatedAt' (для отслеживания времени создания и последнего обновления записи).
  });

  module.exports = Users; 
  // Экспортируем модель 'Users' для использования в других частях приложения.
