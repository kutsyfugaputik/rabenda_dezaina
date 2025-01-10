const { DataTypes } = require('sequelize');
// Импортируем объект 'DataTypes' из Sequelize, который предоставляет типы данных для создания столбцов таблицы.

const sequelize = require('../db'); // Adjust path if necessary
// Подключаем экземпляр 'sequelize', настроенный для взаимодействия с базой данных. Путь '../db' может быть другим в зависимости от структуры проекта.

// Feedback Model
const Feedback = sequelize.define('Feedback', { 
  // Создаем модель 'Feedback' с помощью метода 'define', который будет соответствовать таблице 'feedback' в базе данных.

  feedback_id: {
    type: DataTypes.UUID,
    // Устанавливаем тип данных для поля 'feedback_id' как UUID.
      defaultValue: sequelize.literal('uuid_generate_v4()'),
      // Используем uuid_generate_v4(), встроенную функцию PostgreSQL для генерации UUID.
    primaryKey: true,
    // Устанавливаем это поле как первичный ключ.
  },

  rating: {
    type: DataTypes.INTEGER,
    // Устанавливаем тип данных для поля 'rating' как целое число.
    allowNull: false,
    // Указываем, что поле 'rating' обязательно для заполнения и не может быть пустым.
  },

  text: {
    type: DataTypes.TEXT,
    // Устанавливаем тип данных для поля 'text' как текст. Это поле будет содержать описание или комментарий.
    allowNull: false,
    // Указываем, что поле 'text' обязательно для заполнения и не может быть пустым.
  },

  created: {
    type: DataTypes.DATE,
    // Устанавливаем тип данных для поля 'created' как дату.
    defaultValue: DataTypes.NOW,
    // Устанавливаем значение по умолчанию как текущее время с помощью 'DataTypes.NOW', т.е. дата и время создания записи.
  },

}, 
{
  tableName: 'feedback',
  // Указываем название таблицы в базе данных, которое будет соответствовать модели. В данном случае таблица называется 'feedback'.
  timestamps: false, 
  // Отключаем автоматическое добавление столбцов 'createdAt' и 'updatedAt', так как они нам не нужны. Эти столбцы создаются Sequelize по умолчанию.
});

module.exports = Feedback;
// Экспортируем модель 'Feedback' для использования в других частях приложения.
