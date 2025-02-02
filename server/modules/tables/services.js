const { DataTypes } = require('sequelize'); 
// Из модуля 'sequelize' импортируем объект DataTypes, который содержит типы данных для создания полей в таблице.

const sequelize = require('../db'); 
// Подключаем экземпляр Sequelize, который настроен для взаимодействия с базой данных. Путь к файлу конфигурации может быть другим, в зависимости от структуры проекта.

const ServiceTypes = require('./serv_types'); 
// Подключаем модель 'ServiceTypes', чтобы использовать её при создании связи между таблицами 'services' и 'service_types'.

const Masters = require('./masters'); 
// Подключаем модель 'Masters', чтобы использовать её при создании связи между таблицами 'services' и 'masters'.


/** 
 * Определяем модель для таблицы 'Services'.
 * Метод 'define' создаёт модель, которая будет соответствовать таблице в базе данных.
 */
const Services = sequelize.define('Services', { 

  service_id: { 
    type: DataTypes.INTEGER, 
    // Тип данных для поля 'service_id' — целое число.
    autoIncrement: true, 
    // Устанавливаем автоинкремент, чтобы значение 'service_id' увеличивалось автоматически при добавлении новой записи.
    primaryKey: true, 
    // Устанавливаем это поле как первичный ключ.
  },

  service_type_id: { 
    type: DataTypes.INTEGER, 
    // Тип данных для поля 'service_type_id' — целое число, которое будет ссылаться на идентификатор типа услуги в таблице 'service_types'.
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения.
    references: { 
      model: ServiceTypes, 
      // Указываем, что это поле будет ссылаться на модель 'ServiceTypes'.
      key: 'service_type_id', 
      // Указываем, что оно будет ссылаться на поле 'service_type_id' в таблице 'service_types'.
    },
  },

  name: { 
    type: DataTypes.STRING(100), 
    // Тип данных для поля 'name' — строка длиной до 100 символов.
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения.
  },

  duration: { 
    type: DataTypes.INTEGER, 
    // Тип данных для поля 'duration' — целое число, которое будет хранить продолжительность услуги (например, в минутах).
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения.
  },

  price: { 
    type: DataTypes.DECIMAL(10, 2), 
    // Тип данных для поля 'price' — десятичное число с точностью до 2 знаков после запятой (для хранения стоимости услуги).
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения.
  },

  master_id: { 
    type: DataTypes.UUID,  // Используем UUID, чтобы это поле соответствовало типу в таблице 'masters'
    allowNull: false, 
    // Указываем, что это поле обязательно для заполнения.
    references: { 
      model: Masters, 
      // Указываем, что это поле будет ссылаться на модель 'Masters'.
      key: 'master_id', 
      // Указываем, что оно будет ссылаться на поле 'master_id' в таблице 'masters'.
    },
  },

}, {
  tableName: 'services', 
  // Устанавливаем название таблицы в базе данных, которое будет соответствовать модели. Здесь таблица называется 'services'.
  timestamps: false, 
  // Указываем, что не нужно автоматически добавлять столбцы 'createdAt' и 'updatedAt' (для отслеживания времени создания и последнего обновления записи).
});

module.exports = Services; 
// Экспортируем модель 'Services' для использования в других частях приложения.
