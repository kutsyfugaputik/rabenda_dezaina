const sequelize = require('../modules/db'); // Подключение к базе данных через Sequelize
const logAction = require('../utils/logger'); // Импортируем функцию логирования

// Импорт моделей таблиц
const ServiceTypes = require('../modules/tables/serv_types');
const Users = require('../modules/tables/users');
const Clients = require('../modules/tables/clients');
const Masters = require('../modules/tables/masters');
const Services = require('../modules/tables/services');
const Discounts = require('../modules/tables/discount');
const Statuses = require('../modules/tables/statuses');
const Feedback = require('../modules/tables/feedback');
const Requests = require('../modules/tables/reqs');

// 👉 Устанавливаем ассоциации
const defineAssociations = () => {
  logAction('Запуск определения ассоциаций между моделями...', '🔗'); // Логируем начало процесса определения ассоциаций

  // Пользователь может иметь только одного клиента
  logAction('Определяем ассоциацию: Users.hasOne(Clients)', '🔗'); // Логируем создание ассоциации Users и Clients
  Users.hasOne(Clients, { foreignKey: 'user_id' });
  Clients.belongsTo(Users, { foreignKey: 'user_id' }); // Клиент принадлежит пользователю
  logAction('Ассоциация Users и Clients определена успешно.', '✅'); // Логируем успешное создание ассоциации

  // Пользователь может быть мастером, но один мастер привязан только к одному пользователю
  logAction('Определяем ассоциацию: Users.hasOne(Masters)', '🔗'); // Логируем создание ассоциации Users и Masters
  Users.hasOne(Masters, { foreignKey: 'user_id' });
  Masters.belongsTo(Users, { foreignKey: 'user_id' }); // Мастер принадлежит пользователю
  logAction('Ассоциация Users и Masters определена успешно.', '✅'); // Логируем успешное создание ассоциации

  // Мастер может иметь множество услуг
  logAction('Определяем ассоциацию: Masters.hasMany(Services)', '🔗'); // Логируем создание ассоциации Masters и Services
  Masters.hasMany(Services, { foreignKey: 'master_id' });
  Services.belongsTo(Masters, { foreignKey: 'master_id' }); // Услуга принадлежит мастеру
  logAction('Ассоциация Masters и Services определена успешно.', '✅'); // Логируем успешное создание ассоциации

  // Услуга относится к типу услуги
  logAction('Определяем ассоциацию: Services.belongsTo(ServiceTypes)', '🔗'); // Логируем создание ассоциации Services и ServiceTypes
  Services.belongsTo(ServiceTypes, { foreignKey: 'service_type_id' });
  logAction('Ассоциация Services и ServiceTypes определена успешно.', '✅'); // Логируем успешное создание ассоциации

  // Заказ может быть связан с несколькими сущностями (отзывы, скидки, услуги, статусы, клиенты)
  logAction('Определяем ассоциации для Requests...', '🔗'); // Логируем начало определения ассоциаций для Requests
  Requests.belongsTo(Feedback, { foreignKey: 'feedback_id' });
  Requests.belongsTo(Discounts, { foreignKey: 'discount_id' });
  Requests.belongsTo(Services, { foreignKey: 'service_id' });
  Requests.belongsTo(Statuses, { foreignKey: 'status_id' });
  Requests.belongsTo(Clients, { foreignKey: 'client_id' });
  logAction('Ассоциации для Requests определены успешно.', '✅'); // Логируем успешное создание ассоциаций

  // Статусы могут быть связаны с множеством заказов
  logAction('Определяем ассоциацию: Statuses.hasMany(Requests)', '🔗'); // Логируем создание ассоциации Statuses и Requests
  Statuses.hasMany(Requests, { foreignKey: 'status_id' });
  logAction('Ассоциация Statuses и Requests определена успешно.', '✅'); // Логируем успешное создание ассоциации

  // Отзыв может быть связан с одним заказом
  logAction('Определяем ассоциацию: Feedback.hasOne(Requests)', '🔗'); // Логируем создание ассоциации Feedback и Requests
  Feedback.hasOne(Requests, { foreignKey: 'feedback_id' });
  logAction('Ассоциация Feedback и Requests определена успешно.', '✅'); // Логируем успешное создание ассоциации
};

// Определяем ассоциации
logAction('Запуск определения ассоциаций между моделями...', '🔗'); // Логируем начало процесса
defineAssociations(); // Вызываем функцию для определения ассоциаций
logAction('Определение ассоциаций завершено успешно.', '✅'); // Логируем завершение определения ассоциаций

// Логирование моделей для проверки
logAction('Логируем модели для проверки:', '📝'); // Логируем начало логирования моделей
console.log({ 
  Users,
  Clients,
  Masters,
  Services,
  Discounts, 
  Requests,
  Statuses,
  Feedback,
  ServiceTypes 
}); // Выводим все модели для проверки

// ✅ Экспортируем уже связанные модели
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
