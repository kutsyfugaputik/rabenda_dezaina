const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary


const ServiceTypes = require('./serv_types');
const Masters = require('./masters');

// Services Model
const Services = sequelize.define('Services', {
    service_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    service_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ServiceTypes,
        key: 'service_type_id',
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
   
    master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Masters,
        key: 'master_id',
      },
    },

  }, {
    tableName: 'services',
    timestamps: false,
  });
  
  module.exports = Services;