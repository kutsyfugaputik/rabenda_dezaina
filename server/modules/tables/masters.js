const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary


const Users = require('./users');



// Masters Model
const Masters = sequelize.define('Masters', {
    master_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'user_id',
      },
    },
   
    
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    years_of_experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    work_examples: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'masters',
    timestamps: false,
  });

  module.exports = Masters;