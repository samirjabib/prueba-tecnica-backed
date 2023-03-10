


const express = require('express')
const {
  createCompany,
  getAllCompanies,
  getCompanyByNit,
  editCompany,
  deleteCompany,
  addProduct,
  getInventory,
} = require('./company.controller')
const { validateCompany } = require('./middleware/company.validators')
// Controllers

// Middlewares

const companyRouter = express.Router()

// Endpoints



companyRouter.post("/", validateCompany, createCompany)

companyRouter.get("/", getAllCompanies)

companyRouter.get("/:nit", getCompanyByNit)

companyRouter.patch("/:nit", editCompany)

companyRouter.delete("/:nit", deleteCompany)


/* Add product to inventory company */
companyRouter.post("/add-product", addProduct)


/* Get company inventory by email */

companyRouter.post("/get-inventory/:inventoryId", getInventory)


module.exports = { companyRouter }







/* Get all companies */


/* Get company by id */


/* Edit company */


/* Delete company */