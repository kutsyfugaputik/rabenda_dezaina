const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary

const Clients = require('./clients');
const Services = require('./services');
const Discounts = require('./discount');
const Statuses = require('./statuses');
const Feedback = require('./feedback');



// Requests Model
const Requests = sequelize.define('Requests', {
    request_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    feedback_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Feedback,
        key: 'feedback_id',
      },
    },
    discount_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Discounts,
        key: 'discount_id',
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Services,
        key: 'service_id',
      },
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Statuses,
        key: 'status_id',
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    price_without_discount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    confirmation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    canceled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clients,
        key: 'client_id',
      },
    },
  }, {
    tableName: 'requests',
    timestamps: false,
  });
  
  module.exports = Requests;
  
