const express = require('express')
const router = express.Router()

const options = {
  swaggerDefinition: {
    info: {
      title: 'Eventservice REST - Swagger',
      version: '1.0.0',
      description: 'REST API with Swagger doc',
      contact: {
        email: 'p.artmayr@gmail.com'
      }
    },
    tags: [
      {
        name: 'events',
        description: 'Eventservice API Events'
      },
      {
        name: 'users',
        description: 'Eventservice API Users'
      },
      {
        name: 'registrations',
        description: 'Eventservice API Registrations'
      }
    ],
    schemes: ['http'],
    host: 'localhost:3001',
    basePath: '/api'
  },
  apis: ['./api/controllers/events.js', './api/controllers/users.js', './api/controllers/registrations.js', './api/models/event-model.js', './api/models/user-model.js', './api/models/registration-model.js']
}

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = swaggerJSDoc(options)
require('swagger-model-validator')(swaggerSpec)

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

function validateModel (name, model) {
  const responseValidation = swaggerSpec.validateModel(name, model, false, true)
  if (!responseValidation.valid) {
    console.error(responseValidation.errors)
    throw new Error(`Model doesn't match Swagger contract`)
  }
}

module.exports = {
  router,
  validateModel
}
