

class AppError extends Error {
  constructor(message, statusCode, isOperational) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.isOperational = isOperational || false

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = { AppError }
