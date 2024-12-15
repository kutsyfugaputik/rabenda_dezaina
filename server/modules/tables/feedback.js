const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust path if necessary

 // Feedback Model
 const Feedback = sequelize.define('Feedback', {
    feedback_id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  
  {
    tableName: 'feedback',
    timestamps: false,
  });
  module.exports = Feedback;

