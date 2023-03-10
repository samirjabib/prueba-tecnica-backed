const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Test documentation',
    version: '1.0.1'
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1',
      description: ''
    }
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      authLogin: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          }
        }
      },
      authSignUp: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password'],
        properties: {
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          }
        }
      },
      addCategory: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string'
          },
        }
      },

    }
  }
}

const options = {
  swaggerDefinition,
  apis: [
    `${path.join(__dirname, "../domains/auth/auth.routes.js")}`,
  ]
};

const openApiConfig = swaggerJsDoc(options)

module.exports = { openApiConfig }