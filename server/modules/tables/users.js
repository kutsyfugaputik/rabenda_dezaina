const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary


// Users Model
const Users = sequelize.define('Users', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    father_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    birhtday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });

  module.exports = Users;
