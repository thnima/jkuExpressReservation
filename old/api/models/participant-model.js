/**
 * @swagger
 * definitions:
 *   Participant:
 *     type: object
 *     required:
 *       - id
 *       - eventId
 *       - firstName
 *       - lastName
 *       - escortFirstName
 *       - escortLastName
 *     properties:
 *       id:
 *         type: number
 *       eventId:
 *         type: number
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       escortFirstName:
 *         type: string
 *       escortLastName:
 *         type: string
 *   Participants:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Participant'
 */
export default class Participant {
  constructor (id, eventId, firstName, lastName, escortFirstName, escortLastName) {
    this.id = id
    this.eventId = eventId
    this.firstName = firstName
    this.lastName = lastName
    this.escortFirstName = escortFirstName
    this.escortLastName = escortLastName
  }
}
