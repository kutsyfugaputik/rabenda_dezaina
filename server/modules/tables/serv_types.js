const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary




// ServiceTypes Model
const ServiceTypes = sequelize.define('ServiceTypes', {
    service_type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'service_types',
    timestamps: false,
  });

  module.exports = ServiceTypes;