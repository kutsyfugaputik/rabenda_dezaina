const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary

const Statuses = sequelize.define('Statuses', {
    status_id: {
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
    tableName: 'statuses',
    timestamps: false,
  });
  
  module.exports = Statuses;