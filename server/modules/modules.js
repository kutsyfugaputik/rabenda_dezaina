const sequelize = require('../modules/db'); // Adjust path if needed
// Подключаем объект 'sequelize' из модуля db для взаимодействия с базой данных.

const ServiceTypes = require('../modules/tables/serv_types');
const Users = require('../modules/tables/users');
const Clients = require('../modules/tables/clients');
const Masters = require('../modules/tables/masters');
const Services = require('../modules/tables/services');
const Discounts = require('../modules/tables/discount');
const Statuses = require('../modules/tables/statuses');
const Feedback = require('../modules/tables/feedback');
const Requests = require('../modules/tables/reqs');
// Импортируем модели для всех таблиц, которые мы будем использовать в ассоциациях.


// Export the models
module.exports = {
  Users,
  Clients,
  Masters,
  Services,
  Discounts, 
  Requests,
  Statuses,
  Feedback,
  ServiceTypes,
};
// Экспортируем все модели, чтобы они были доступны для использования в других частях проекта.


// Define associations first
const defineAssociations = () => {
  // Associations
  Users.hasOne(Clients, { foreignKey: 'user_id' });
  // Устанавливаем связь один к одному между 'Users' и 'Clients', где поле 'user_id' является внешним ключом в таблице 'Clients'.

  Users.hasOne(Masters, { foreignKey: 'user_id' });
  // Устанавливаем связь один к одному между 'Users' и 'Masters', где поле 'user_id' является внешним ключом в таблице 'Masters'.

  Clients.belongsTo(Users, { foreignKey: 'user_id' });
  // Устанавливаем связь многие к одному между 'Clients' и 'Users', где 'user_id' в таблице 'Clients' ссылается на 'Users'.

  Masters.belongsTo(Users, { foreignKey: 'user_id' });
  // Устанавливаем связь многие к одному между 'Masters' и 'Users', где 'user_id' в таблице 'Masters' ссылается на 'Users'.

  Masters.hasMany(Services, { foreignKey: 'master_id' });
  // Устанавливаем связь один ко многим между 'Masters' и 'Services', где 'master_id' является внешним ключом в таблице 'Services'.

  Services.belongsTo(ServiceTypes, { foreignKey: 'service_type_id' });
  // Устанавливаем связь многие к одному между 'Services' и 'ServiceTypes', где 'service_type_id' в таблице 'Services' ссылается на 'ServiceTypes'.

  Services.belongsTo(Masters, { foreignKey: 'master_id' });
  // Устанавливаем связь многие к одному между 'Services' и 'Masters', где 'master_id' в таблице 'Services' ссылается на 'Masters'.

  Requests.belongsTo(Feedback, { foreignKey: 'feedback_id' });
  // Устанавливаем связь многие к одному между 'Requests' и 'Feedback', где 'feedback_id' в таблице 'Requests' ссылается на 'Feedback'.

  Requests.belongsTo(Discounts, { foreignKey: 'discount_id' });
  // Устанавливаем связь многие к одному между 'Requests' и 'Discounts', где 'discount_id' в таблице 'Requests' ссылается на 'Discounts'.

  Requests.belongsTo(Services, { foreignKey: 'service_id' });
  // Устанавливаем связь многие к одному между 'Requests' и 'Services', где 'service_id' в таблице 'Requests' ссылается на 'Services'.

  Requests.belongsTo(Statuses, { foreignKey: 'status_id' });
  // Устанавливаем связь многие к одному между 'Requests' и 'Statuses', где 'status_id' в таблице 'Requests' ссылается на 'Statuses'.

  Requests.belongsTo(Clients, { foreignKey: 'client_id' });
  // Устанавливаем связь многие к одному между 'Requests' и 'Clients', где 'client_id' в таблице 'Requests' ссылается на 'Clients'.

  Statuses.hasMany(Requests, { foreignKey: 'status_id' });
  // Устанавливаем связь один ко многим между 'Statuses' и 'Requests', где 'status_id' в таблице 'Requests' ссылается на 'Statuses'.

  Feedback.hasOne(Requests, { foreignKey: 'feedback_id' });
  // Устанавливаем связь один к одному между 'Feedback' и 'Requests', где 'feedback_id' в таблице 'Requests' ссылается на 'Feedback'.
};

// Call the function to define associations
defineAssociations();
// Вызываем функцию для установления всех ассоциаций между моделями.
