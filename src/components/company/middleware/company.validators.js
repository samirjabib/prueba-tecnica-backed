const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')

const companySchema = Joi.object({
  nit: Joi.number(),
  name: Joi.string()
    .min(5)
    .max(50),
  address: Joi.string()
    .min(5)
    .max(100)
    .required(),
  phone: Joi.string()
    .min(10)
    .max(10)
    .required()

})


const validateCompany = (req, res, next) => {
  const data = req.body

  const { error } = companySchema.validate(data, { abortEarly: false })

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details })
  }

  next()
}

module.exports = { validateCompany }
