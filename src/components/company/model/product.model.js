const { DataTypes } = require('sequelize')
const { db } = require('../../../../config/postgres')


const Product = db.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  inventoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
})

module.exports = { Product }