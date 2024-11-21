const sequelize = require('../modules/db'); // Подключаем объект 'sequelize' для взаимодействия с базой данных.

const ServiceTypes = require('../modules/tables/serv_types');
const Users = require('../modules/tables/users');
const Clients = require('../modules/tables/clients');
const Masters = require('../modules/tables/masters');
const Services = require('../modules/tables/services');
const Discounts = require('../modules/tables/discount');
const Statuses = require('../modules/tables/statuses');
const Feedback = require('../modules/tables/feedback');
const Requests = require('../modules/tables/reqs');
// Импортируем все модели для работы с таблицами, с которыми будем работать в ассоциациях.

// Экспортируем модели, чтобы их можно было использовать в других частях проекта.
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

// Функция для определения ассоциаций между моделями
const defineAssociations = () => {
  // Логируем начало процесса установки ассоциаций
  console.log('Начинаем устанавливать ассоциации между моделями.');

  // Связь один к одному между 'Users' и 'Clients'
  Users.hasOne(Clients, { foreignKey: 'user_id' });
  Clients.belongsTo(Users, { foreignKey: 'user_id' });
  console.log('Установлена ассоциация между Users и Clients.');

  // Связь один к одному между 'Users' и 'Masters'
  Users.hasOne(Masters, { foreignKey: 'user_id' });
  Masters.belongsTo(Users, { foreignKey: 'user_id' });
  console.log('Установлена ассоциация между Users и Masters.');

  // Связь один ко многим между 'Masters' и 'Services'
  Masters.hasMany(Services, { foreignKey: 'master_id' });
  Services.belongsTo(Masters, { foreignKey: 'master_id' });
  console.log('Установлена ассоциация между Masters и Services.');

  // Связь многие к одному между 'Services' и 'ServiceTypes'
  Services.belongsTo(ServiceTypes, { foreignKey: 'service_type_id' });
  console.log('Установлена ассоциация между Services и ServiceTypes.');

  // Связь многие к одному между 'Requests' и другими сущностями
  Requests.belongsTo(Feedback, { foreignKey: 'feedback_id' });
  Requests.belongsTo(Discounts, { foreignKey: 'discount_id' });
  Requests.belongsTo(Services, { foreignKey: 'service_id' });
  Requests.belongsTo(Statuses, { foreignKey: 'status_id' });
  Requests.belongsTo(Clients, { foreignKey: 'client_id' });
  console.log('Установлены ассоциации между Requests и Feedback, Discounts, Services, Statuses, Clients.');

  // Связь один ко многим между 'Statuses' и 'Requests'
  Statuses.hasMany(Requests, { foreignKey: 'status_id' });
  console.log('Установлена ассоциация между Statuses и Requests.');

  // Связь один к одному между 'Feedback' и 'Requests'
  Feedback.hasOne(Requests, { foreignKey: 'feedback_id' });
  console.log('Установлена ассоциация между Feedback и Requests.');

  // Логируем завершение процесса установки ассоциаций
  console.log('Все ассоциации установлены.');
};

// Вызываем функцию для установки ассоциаций
defineAssociations();
