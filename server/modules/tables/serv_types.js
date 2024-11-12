const { DataTypes } = require('sequelize'); 
// Из модуля 'sequelize' импортируем объект DataTypes, который содержит типы данных для создания полей в таблице.

const sequelize = require('../db'); 
// Подключаем экземпляр Sequelize, который настроен для взаимодействия с базой данных. Путь к файлу конфигурации может быть другим, в зависимости от структуры проекта.


// ServiceTypes Model
const ServiceTypes = sequelize.define('ServiceTypes', { 
  // Определяем модель для таблицы 'ServiceTypes'. Метод 'define' создаёт модель, которая будет соответствовать таблице в базе данных.

    service_type_id: { 
      type: DataTypes.INTEGER, 
      // Тип данных для поля 'service_type_id' — целое число.
      autoIncrement: true, 
      // Устанавливаем автоинкремент, чтобы значение 'service_type_id' увеличивалось автоматически при добавлении новой записи.
      primaryKey: true, 
      // Устанавливаем это поле как первичный ключ.
    },

    name: { 
      type: DataTypes.STRING(100), 
      // Тип данных для поля 'name' — строка длиной до 100 символов.
      allowNull: false, 
      // Указываем, что это поле обязательно для заполнения.
    },

    description: { 
      type: DataTypes.TEXT, 
      // Тип данных для поля 'description' — текстовое поле (неограниченная длина).
      allowNull: true, 
      // Указываем, что это поле может быть пустым.
    },

  }, {
    tableName: 'service_types', 
    // Устанавливаем название таблицы в базе данных, которое будет соответствовать модели. Здесь таблица называется 'service_types'.
    timestamps: false, 
    // Указываем, что не нужно автоматически добавлять столбцы 'createdAt' и 'updatedAt' (для отслеживания времени создания и последнего обновления записи).
  });

  module.exports = ServiceTypes; 
  // Экспортируем модель 'ServiceTypes' для использования в других частях приложения.
