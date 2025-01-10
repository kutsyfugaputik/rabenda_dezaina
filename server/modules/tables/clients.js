const { DataTypes } = require('sequelize'); 
// Из модуля 'sequelize' импортируем объект DataTypes, который содержит типы данных для создания полей в таблице.

const sequelize = require('../db'); 
// Подключаем экземпляр Sequelize, который настроен для взаимодействия с базой данных. Путь к файлу конфигурации может быть другим, в зависимости от структуры проекта.

const Users = require('./users'); 
// Подключаем модель 'Users', чтобы использовать её при создании связи между таблицами 'clients' и 'users'.

// Clients Model
const Clients = sequelize.define('Clients', { 
  // Определяем модель для таблицы 'Clients'. Метод 'define' создаёт модель, которая будет соответствовать таблице в базе данных.

  client_id: { 
    type: DataTypes.UUID, 
    // Тип данных для поля 'client_id' — UUID.
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

}, {
  tableName: 'clients', 
  // Устанавливаем название таблицы в базе данных, которое будет соответствовать модели. Здесь таблица называется 'clients'.
  timestamps: false, 
  // Указываем, что не нужно автоматически добавлять столбцы 'createdAt' и 'updatedAt' (для отслеживания времени создания и последнего обновления записи).
});

// Устанавливаем связь между таблицами, если это необходимо:
Clients.belongsTo(Users, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
  onDelete: 'CASCADE', // Добавляем каскадное удаление для удаления связанных записей при удалении пользователя
});

module.exports = Clients; 
// Экспортируем модель 'Clients' для использования в других частях приложения.
