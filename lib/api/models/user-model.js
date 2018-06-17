/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - id
 *       - userName
 *       - isAdmin
 *     properties:
 *       id:
 *         type: number
 *       userName:
 *         type: string
 *       isAdmin:
 *         type: boolean
 *   UserWithoutID:
 *     type: object
 *     required:
 *       - userName
 *       - isAdmin
 *     properties:
 *       userName:
 *         type: string
 *       isAdmin:
 *         type: boolean
 *   Users:
 *     type: array
 *     items:
 *       $ref: '#/definitions/User'
 */
export default class User {
  constructor (id, userName, isAdmin) {
    this.id = id
    this.userName = userName
    this.isAdmin = isAdmin
  }
}
