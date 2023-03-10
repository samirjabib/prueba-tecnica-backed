const Joi = require('joi')

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(3)
    .max(50),
  password: Joi.string()
    .min(3)
    .max(50)
    .required(),
  role: Joi.string()
    .optional()

})

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(3)
    .max(50),
  password: Joi.string()
    .min(3)
    .max(50)
    .required()

})

const validateAuth = (req, res, next) => {
  const data = req.body

  const { error } = userSchema.validate(data, { abortEarly: false })

  if (error) {
    return res.json({ error: error.details })
  }

  next()
}

const validateLogin = (req, res, next) => {
  const data = req.body

  const { error } = loginSchema.validate(data, { abortEarly: false })

  if (error) {
    return res.json({ error: error.details })
  }

  next()
}

module.exports = { validateAuth, validateLogin }
