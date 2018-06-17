/**
 * @swagger
 * definitions:
 *   Registration:
 *     type: object
 *     required:
 *       - id
 *       - userId
 *       - eventId
 *       - plusOne
 *     properties:
 *       id:
 *         type: number
 *       userId:
 *         type: number
 *       eventId:
 *         type: number
 *       plusOne:
 *         type: boolean
 *   RegistrationWithoutID:
 *     type: object
 *     required:
 *       - userId
 *       - eventId
 *       - plusOne
 *     properties:
 *       userId:
 *         type: number
 *       eventId:
 *         type: number
 *       plusOne:
 *         type: boolean
 *   Registrations:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Registration'
 */
export default class Registration {
  constructor (id, userId, eventId, plusOne) {
    this.id = id
    this.userId = userId
    this.eventId = eventId
    this.plusOne = plusOne
  }
}
