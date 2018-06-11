import * as DAO from '../daos/'
import * as Swagger from './swagger'

const dao = DAO.getInstance('users')

const express = require('express')
const router = express.Router()

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/**
 * User stuff
 * */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve the full list of participants
 *     description: Retrieve the full list of participants
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           $ref: '#/definitions/Users'
 */
router.get('/', (req, res, next) => {
  const response = dao.retrieveAllParticipants()
  Swagger.validateModel('Users', response)
  res.send(response)
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve an specific participant
 *     description: Retrieve an specific participant
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the participant to retrieve
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/:id', (req, res, next) => {
  const response = dao.retrieveParticipant(parseInt(req.params.id, 10))
  Swagger.validateModel('User', response)
  res.send(response)
})

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an participant
 *     description: Update an participant
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: participant
 *         description: Participant object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: updated participant
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.put('/:id', (req, res, next) => {
  Swagger.validateModel('User', req.body)
  const response = dao.updateParticipant(parseInt(req.body.id, 10), req.body)
  Swagger.validateModel('User', response)
  res.send(response)
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new participant
 *     description: Create a new participant
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserWithoutID'
 *     responses:
 *       200:
 *         description: new user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/', (req, res, next) => {
  const response = dao.createParticipant(req.body)
  Swagger.validateModel('User', response)
  res.send(response)
})

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete an specific participant
 *     description: Delete an specific participant
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the participant to delete
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       400:
 *          description: "Invalid ID supplied"
 *       404:
 *          description: "Participant not found"
 */
router.delete('/:id', (req, res, next) => {
  const response = dao.deleteParticipant(parseInt(req.params.id, 10))
  res.status(200).send({id: response})
  Swagger.validateModel('User', response)
  res.send(response)
})

module.exports = router
