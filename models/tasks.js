const { DataTypes } = require("sequelize");
const db = require("../database/connection");
const jwt = require('jsonwebtoken');

const Tasks = db.define("Tasks", {
  taskId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  workerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Tasks;
