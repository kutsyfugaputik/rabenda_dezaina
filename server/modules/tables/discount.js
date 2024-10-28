const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary



// Discounts Model
const Discounts = sequelize.define('Discounts', {
    discount_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'discounts',
    timestamps: false,
  });
  
  module.exports = Discounts;