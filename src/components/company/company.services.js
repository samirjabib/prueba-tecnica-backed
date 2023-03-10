
const { StatusCodes } = require("http-status-codes")
const { AppError } = require("../../utils/appError")
const { Company } = require("./model/company.model")
const { Inventory } = require("./model/inventory.model")
const { Product } = require("./model/product.model")
const { Email } = require("../../services/email/email.service")



const createCompany = async (data) => {

  const { nit, name, address, phone } = data;

  const companyExist = await Company.findOne({
    where: {
      nit
    }
  })

  if (companyExist) {
    return new AppError(
      'COMPANY-ALREADY-EXIST',
      StatusCodes.BAD_REQUEST,
      true
    )
  }

  const company = await Company.create({
    nit,
    name,
    address,
    phone
  })

  const companyInvetory = await Inventory.create({
    companyNit: company.nit
  })

  return { company }

}

const getAllCompanies = async () => {

  console.log("wer are here")

  const companies = await Company.findAll({
    where: {
      status: "active"
    }
  })

  if (!companies) {
    return new AppError(
      'COMPANIES NOT FOUND',
      StatusCodes.BAD_REQUEST,
      true
    )
  }

  return companies

}

const getCompanyByNit = async (nit) => {


  /* weird bug fix tomorrow, about error handler */
  const company = await Company.findOne({
    where: {
      nit,
      status: "active"
    },
    include: [
      {
        model: Inventory,
        include: [
          { model: Product }
        ]
      }
    ]
  })


  if (!company) {
    return new AppError(
      'COMPANY NOT FOUND',
      StatusCodes.NOT_FOUND,
      true
    )
  }


  return company
}

const editCompany = async (nit, data) => {

  const company = await Company.findOne({
    where: {
      nit,
      status: "active"
    }
  })

  if (!company) {
    return new AppError(
      'COMPANY NOT FOUND',
      StatusCodes.NOT_FOUND,
      true
    )
  }

  await company.update({ ...data })

  return "updated"

}

const deleteCompany = async (nit) => {

  const company = await Company.findOne({
    where: {
      nit,
      status: "active"
    }
  })

  if (!company) {
    return new AppError(
      'COMPANY NOT FOUND',
      StatusCodes.NOT_FOUND,
      true
    )
  }

  /* Soft delete */
  await company.update({
    status: "deleted"
  })


  return "deleted"

}

const addProduct = async (data) => {
  const newProduct = await Product.create({ ...data })
  return newProduct
}

const getInventory = async (inventoryId, email) => {

  const inventory = await Inventory.findOne({
    where: {
      id: inventoryId
    },
    include: [
      { model: Product }
    ]
  })

  const products = inventory.products
  new Email(email).sendInventory(products)
  return "Email sent"

}
module.exports = { createCompany, getAllCompanies, getCompanyByNit, editCompany, deleteCompany, addProduct, getInventory }