import * as DAO from '../daos/'
import * as Swagger from './swagger'

const dao = DAO.getInstance('participants')

const express = require('express')
const router = express.Router()

/**
 * Participant stuff
 * */

/**
 * @swagger
 * /participants:
 *   get:
 *     summary: Retrieve the full list of participants
 *     description: Retrieve the full list of participants
 *     tags:
 *       - participants
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: participants
 *         schema:
 *           $ref: '#/definitions/Participants'
 */
router.get('/', (req, res, next) => {
  const response = dao.retrieveAllParticipants()
  Swagger.validateModel('Participants', response)
  res.send(response)
})

/**
 * @swagger
 * /participants/{id}:
 *   get:
 *     summary: Retrieve an specific participant
 *     description: Retrieve an specific participant
 *     tags:
 *       - participants
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
 *         description: participant
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.get('/:id', (req, res, next) => {
  const response = dao.retrieveParticipant(parseInt(req.params.id, 10))
  Swagger.validateModel('Participant', response)
  res.send(response)
})

/**
 * @swagger
 * /participants/{id}:
 *   put:
 *     summary: Update an participant
 *     description: Update an participant
 *     tags:
 *       - participants
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: participant
 *         description: Participant object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Participant'
 *     responses:
 *       200:
 *         description: updated participant
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.put('/:id', (req, res, next) => {
  Swagger.validateModel('Participant', req.body)
  const response = dao.updateParticipant(parseInt(req.body.id, 10), req.body)
  Swagger.validateModel('Participant', response)
  res.send(response)
})

/**
 * @swagger
 * /participants:
 *   post:
 *     summary: Create a new participant
 *     description: Create a new participant
 *     tags:
 *       - participants
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: participant
 *         description: Participant object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Participant'
 *     responses:
 *       200:
 *         description: new participant
 *         schema:
 *           $ref: '#/definitions/Participant'
 */
router.post('/', (req, res, next) => {
  const response = dao.createParticipant(req.body)
  Swagger.validateModel('Participant', response)
  res.send(response)
})

/**
 * @swagger
 * /participants/{id}:
 *   delete:
 *     summary: Delete an specific participant
 *     description: Delete an specific participant
 *     tags:
 *       - participants
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
  Swagger.validateModel('Participant', response)
  res.send(response)
})

module.exports = router
