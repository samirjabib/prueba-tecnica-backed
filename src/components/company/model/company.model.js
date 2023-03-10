const { DataTypes } = require('sequelize')
const { db } = require('../../../../config/postgres')


const Company = db.define('companies', {
  nit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM([
      'active',
      'deleted'
    ]),
    defaultValue: 'active'
  },
})

module.exports = { Company }