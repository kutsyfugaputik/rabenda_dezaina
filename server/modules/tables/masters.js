const { DataTypes } = require('sequelize'); 
// Из модуля 'sequelize' импортируем объект DataTypes, который содержит типы данных для создания полей в таблице.

const sequelize = require('../db'); 
// Подключаем экземпляр Sequelize, который настроен для взаимодействия с базой данных. Путь к файлу конфигурации может быть другим, в зависимости от структуры проекта.

const Users = require('./users'); 
// Подключаем модель 'Users', чтобы использовать её при создании связи между таблицами 'masters' и 'users'.

// Masters Model
const Masters = sequelize.define('Masters', { 
  // Определяем модель для таблицы 'Masters'. Метод 'define' создаёт модель, которая будет соответствовать таблице в базе данных.

  master_id: { 
    type: DataTypes.UUID, 
    // Тип данных для поля 'master_id' — UUID.
      defaultValue: sequelize.literal('uuid_generate_v4()'),
      // Используем uuid_generate_v4(), встроенную функцию PostgreSQL для генерации UUID.
    primaryKey: true, 
    // Устанавливаем это поле как первичный ключ.
  },

  user_id: { 
    type: DataTypes.UUID,  // Используем UUID, чтобы это поле соответствовало типу в таблице 'users'
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения (не может быть пустым).
    references: { 
      model: Users, 
      // Указываем, что это поле будет ссылаться на модель 'Users'.
      key: 'user_id', 
      // Указываем, что оно будет ссылаться на поле 'user_id' в таблице 'users'.
    },
  },

  specialization: { 
    type: DataTypes.STRING(100), 
    // Тип данных для поля 'specialization' — строка длиной до 100 символов. Это специальность мастера.
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения (не может быть пустым).
  },

  years_of_experience: { 
    type: DataTypes.INTEGER, 
    // Тип данных для поля 'years_of_experience' — целое число. Количество лет опыта работы мастера.
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения.
  },
  tg_uid: { 
    type: DataTypes.INTEGER, 
    // Тип данных для поля 'years_of_experience' — целое число. Количество лет опыта работы мастера.
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения.
  },
  work_examples: { 
    type: DataTypes.TEXT, 
    // Тип данных для поля 'work_examples' — текст. Это поле может содержать большие объемы информации о примерах работы мастера.
    allowNull: true, 
    // Поле 'work_examples' не обязательно для заполнения.
  },

}, {
  tableName: 'masters', 
  // Устанавливаем название таблицы в базе данных, которое будет соответствовать модели. Здесь таблица называется 'masters'.
  timestamps: false, 
  // Указываем, что не нужно автоматически добавлять столбцы 'createdAt' и 'updatedAt' (для отслеживания времени создания и последнего обновления записи).
});

module.exports = Masters; 
// Экспортируем модель 'Masters' для использования в других частях приложения.
