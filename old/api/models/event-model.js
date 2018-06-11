/**
 * @swagger
 * definitions:
 *   Event:
 *     type: object
 *     required:
 *       - id
 *       - title
 *       - date
 *       - location
 *       - description
 *       - maxMember
 *     properties:
 *       id:
 *         type: number
 *       title:
 *         type: string
 *       date:
 *         type: number
 *       location:
 *         type: string
 *       description:
 *         type: string
 *       maxMember:
 *         type: number
 *   Events:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Event'
 */
export default class Event {
  constructor (id, title, date, location, description, maxMember) {
    this.id = id
    this.title = title
    this.date = date
    this.location = location
    this.description = description
    this.maxMember = maxMember
  }
}