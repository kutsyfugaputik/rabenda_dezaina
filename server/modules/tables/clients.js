const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary

const Users = require('./users');


// Clients Model
const Clients = sequelize.define('Clients', {
    client_id: {
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
   
  }, {
    tableName: 'clients',
    timestamps: false,
  });
  
  module.exports = Clients;
