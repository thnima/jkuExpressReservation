import * as DAO from '../daos/'
import * as Swagger from './swagger'

const dao = DAO.getInstance('events')

const express = require('express')
const router = express.Router()
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/**
 * Event stuff
 * */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve the full list of events
 *     description: Retrieve the full list of events
 *     tags:
 *       - events
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: events
 *         schema:
 *           $ref: '#/definitions/Events'
 */
router.get('/', (req, res, next) => {
  const response = dao.retrieveAllEvents()
  Swagger.validateModel('Events', response)
  res.send(response)
})

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Retrieve an specific event
 *     description: Retrieve an specific event
 *     tags:
 *       - events
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the event to retrieveEvent
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: event
 *         schema:
 *           $ref: '#/definitions/Event'
 */
router.get('/:id', (req, res, next) => {
  const response = dao.retrieveEvent(parseInt(req.params.id, 10))
  Swagger.validateModel('Event', response)
  res.send(response)
})

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     description: Update an event
 *     tags:
 *       - events
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: event
 *         description: Event object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Event'
 *     responses:
 *       200:
 *         description: updated event
 *         schema:
 *           $ref: '#/definitions/Event'
 */
router.put('/:id', (req, res, next) => {
  Swagger.validateModel('Event', req.body)
  const response = dao.updateEvent(parseInt(req.body.id, 10), req.body)
  Swagger.validateModel('Event', response)
  res.send(response)
})

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Create a new event
 *     tags:
 *       - events
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: event
 *         description: Event object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Event'
 *     responses:
 *       200:
 *         description: new event
 *         schema:
 *           $ref: '#/definitions/Event'
 */
router.post('/', (req, res, next) => {
  const response = dao.createEvent(req.body)
  Swagger.validateModel('Event', response)
  res.send(response)
})

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an specific event
 *     description: Delete an specific event
 *     tags:
 *       - events
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the event to deleteEvent
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       400:
 *          description: "Invalid ID supplied"
 *       404:
 *          description: "Event not found"
 */
router.delete('/:id', (req, res, next) => {
  const response = dao.deleteEvent(parseInt(req.params.id, 10))
  console.log(response)
  Swagger.validateModel('Event', response)
  res.send(response)
})

module.exports = router
