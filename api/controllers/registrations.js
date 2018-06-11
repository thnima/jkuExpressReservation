import * as DAO from '../daos/'
import * as Swagger from './swagger'

const dao = DAO.getInstance('registrations')

const express = require('express')
const router = express.Router()

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/**
 * Registrations stuff
 * */

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Retrieve the full list of registrations
 *     description: Retrieve the full list of registrations
 *     tags:
 *       - registrations
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: registrations
 *         schema:
 *           $ref: '#/definitions/Registrations'
 */
router.get('/', (req, res, next) => {
  const userId = parseInt(req.query.userId);
  const eventId = parseInt(req.query.eventId);
  const response = dao.retrieveAllReg({userId, eventId});
  Swagger.validateModel('Registrations', response)
  res.send(response)
})

/**
 * @swagger
 * /registrations/{id}:
 *   get:
 *     summary: Retrieve an specific registration
 *     description: Retrieve an specific registration
 *     tags:
 *       - registrations
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the registration to retrieve
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: registration
 *         schema:
 *           $ref: '#/definitions/Registration'
 */
router.get('/:id', (req, res, next) => {
  const response = dao.retrieveReg(parseInt(req.params.id, 10))
  Swagger.validateModel('Registration', response)
  res.send(response)
})

/**
 * @swagger
 * /registrations/{userId}&{eventId}:
 *   get:
 *     summary: Retrieve an specific registration with userId and eventId
 *     description: Retrieve an specific registration with userId and eventId
 *     tags:
 *       - registrations
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId of the registration
 *         in: path
 *         required: true
 *         type: number
 *       - name: eventId
 *         description: eventId of the registration
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: registrations
 *         schema:
 *           $ref: '#/definitions/Registrations'
 */
router.get('/:userId&:eventId', (req, res, next) => {
  const response = dao.retrieveRegFilter(parseInt(req.params.userId, 10), parseInt(req.params.eventId, 10))
  Swagger.validateModel('Registration', response)
  res.send(response)
})

/**
 * @swagger
 * /registrations/{id}:
 *   put:
 *     summary: Update an registration
 *     description: Update an registration
 *     tags:
 *       - registrations
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: registration
 *         description: registration object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Registration'
 *     responses:
 *       200:
 *         description: updated registration
 *         schema:
 *           $ref: '#/definitions/Registration'
 */
router.put('/:id', (req, res, next) => {
  Swagger.validateModel('Registration', req.body)
  const response = dao.updateReg(parseInt(req.body.id, 10), req.body)
  Swagger.validateModel('Registration', response)
  res.send(response)
})

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Create a new registration
 *     description: Create a new registration
 *     tags:
 *       - registrations
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: registration
 *         description: registration object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RegistrationWithoutID'
 *     responses:
 *       200:
 *         description: new registration
 *         schema:
 *           $ref: '#/definitions/Registration'
 */
router.post('/', (req, res, next) => {
  const response = dao.createReg(req.body)
  Swagger.validateModel('Registration', response)
  res.send(response)
})

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Delete an specific registration
 *     description: Delete an specific registration
 *     tags:
 *       - registrations
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the registration to delete
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       400:
 *          description: "Invalid ID supplied"
 *       404:
 *          description: "registration not found"
 */
router.delete('/:id', (req, res, next) => {
  const response = dao.deleteReg(parseInt(req.params.id, 10))
  res.status(200).send({id: response})
  Swagger.validateModel('Registration', response)
  res.send(response)
})

module.exports = router
