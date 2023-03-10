const { Company } = require("../components/company/model/company.model")
const { Inventory } = require("../components/company/model/inventory.model")
const { Product } = require("../components/company/model/product.model")

const initRelationships = () => {

  Company.hasOne(Inventory)
  Inventory.belongsTo(Company)

  Inventory.hasMany(Product, { foreignKey: "inventoryId" })
  Product.belongsTo(Inventory)
}

module.exports = { initRelationships }