
const { StatusCodes } = require("http-status-codes")
const companyServices = require("./company.services")

const createCompany = async (req, res, next) => {

  try {
    const data = req.body
    const response = await companyServices.createCompany(data)

    const error = response.stack
    if (error) {
      return next(response)
    }

    res.status(StatusCodes.CREATED).json(response)

  } catch (error) {
    next(error)
  }

}

const getAllCompanies = async (req, res, next) => {

  try {
    const response = await companyServices.getAllCompanies()

    const error = response.stack
    if (error) {
      return next(response)
    }

    res.status(StatusCodes.OK).json(response)

  } catch (error) {
    next(error)
  }

}

const getCompanyByNit = async (req, res, next) => {

  try {

    const { nit } = req.params;

    const response = await companyServices.getCompanyByNit(nit)


    const error = response.stack
    if (error) {
      return next(response)
    }

    res.status(StatusCodes.OK).json(response)

  } catch (error) {

  }

}

const editCompany = async (req, res, next) => {

  try {
    const { nit } = req.params;

    const data = req.body;

    const response = await companyServices.editCompany(nit, data)

    const error = response.stack
    if (error) {
      return next(response)
    }

    res.status(StatusCodes.NO_CONTENT).json(response)

  } catch (error) {

  }

}

const deleteCompany = async (req, res, next) => {
  try {
    const { nit } = req.params;

    const response = await companyServices.deleteCompany(nit)

    const error = response.stack
    if (error) {
      return next(response)
    }

    res.status(StatusCodes.NO_CONTENT).json(response)

  } catch (error) {

  }

}


/* Add product to invetory */

const addProduct = async (req, res, next) => {
  try {

    const data = req.body;

    const response = companyServices.addProduct(data)

    const error = response.stack
    if (error) {
      return next(response)
    }

    res.status(StatusCodes.OK).json(response)



  } catch (error) {
    next(error)
  }

}
/* SEND INVENTARY TO PDF */

const getInventory = async (req, res, next) => {
  try {
    const { inventoryId } = req.params;
    const { email } = req.body;
    const response = await companyServices.getInventory(inventoryId, email)
    res.status(StatusCodes.OK).json({ response })
  } catch (error) {
    next(error)
  }
}


module.exports = { createCompany, getAllCompanies, getCompanyByNit, editCompany, deleteCompany, addProduct, getInventory }