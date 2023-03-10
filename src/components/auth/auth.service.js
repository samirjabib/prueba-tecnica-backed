
const { encrypt, compare } = require('../../utils/handlePassword')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { AppError } = require('../../utils/appError')
const { User } = require('./model/user.model')

const signUp = async (data) => {


  const { email, password, role } = data

  const userExist = await User.findOne({
    where: {
      email
    }
  })

  if (userExist) {
    return new AppError(
      'USER_ALREADY_EXIST',
      StatusCodes.BAD_REQUEST,
      true
    )
  }

  const hashPassword = await encrypt(password)

  const user = await User.create({
    email,
    password: hashPassword,
    role
  })

  user.password = undefined

  return { user }

}


const login = async (data) => {
  const { email, password } = data

  const user = await User.findOne({
    where: {
      email,
    }
  })

  if (!user) {
    return new AppError(
      'USER_AND_PASSWORD_FAIL',
      StatusCodes.BAD_REQUEST,
      true
    )
  }
  const passOkay = await compare(password, user.password)

  if (!passOkay) {
    return new AppError(
      'USER_AND_PASSWORD_FAIL',
      StatusCodes.BAD_REQUEST,
      true
    )
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SIGN,
    { expiresIn: '1d' }
  )

  user.password = undefined


  return { user, token }
}

module.exports = { signUp, login }
