const { DataTypes } = require('sequelize')
const { db } = require('../../../../config/postgres')


const Inventory = db.define('inventaries', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  companyNit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM([
      'active',
      'disable'
    ]),
    defaultValue: 'active'
  },
})

module.exports = { Inventory }