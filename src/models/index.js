
const { User } = require("../components/auth/model/user.model")
const { Company } = require("../components/company/model/company.model")
const { Inventory } = require("../components/company/model/inventory.model")
const { Product } = require("../components/company/model/product.model")

const Models = {
  User,
  Company,
  Inventory,
  Product
}

module.exports = { Models }
