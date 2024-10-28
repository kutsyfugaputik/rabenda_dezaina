const sequelize = require('../modules/db'); // Adjust path if needed
const ServiceTypes = require('../modules/tables/serv_types');
const Users = require('../modules/tables/users');
const Clients = require('../modules/tables/clients');
const Masters = require('../modules/tables/masters');
const Services = require('../modules/tables/services');
const Discounts = require('../modules/tables/discount');
const Statuses = require('../modules/tables/statuses');
const Feedback = require('../modules/tables/feedback');
const Requests = require('../modules/tables/reqs');

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

// Define associations first
const defineAssociations = () => {
  // Associations
  Users.hasOne(Clients, { foreignKey: 'user_id' });
  Users.hasOne(Masters, { foreignKey: 'user_id' });

  Clients.belongsTo(Users, { foreignKey: 'user_id' });


  Masters.belongsTo(Users, { foreignKey: 'user_id' });
  Masters.hasMany(Services, { foreignKey: 'master_id' });

  Services.belongsTo(ServiceTypes, { foreignKey: 'service_type_id' });
  Services.belongsTo(Masters, { foreignKey: 'master_id' });


  Requests.belongsTo(Feedback, { foreignKey: 'feedback_id' });
  Requests.belongsTo(Discounts, { foreignKey: 'discount_id' });
  Requests.belongsTo(Services, { foreignKey: 'service_id' });
  Requests.belongsTo(Statuses, { foreignKey: 'status_id' });
  Requests.belongsTo(Clients, { foreignKey: 'client_id' });

  Statuses.hasMany(Requests, { foreignKey: 'status_id' });

  Feedback.hasOne(Requests, { foreignKey: 'feedback_id' });
};

// Call the function to define associations
defineAssociations();
