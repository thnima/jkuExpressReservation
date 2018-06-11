import Model from '../models/participant-model'

export default class ParticipantsMemoryDao {
  constructor () {
    this.dataParticipants = new Map()

    this.createParticipantReally(1, 1, 'Phil', 'Art', 'Bill', 'Gates')
    this.createParticipantReally(2, 1, 'And', 'Art', '', '')
    this.createParticipantReally(3, 1, 'Mat', 'Art', 'Steve', 'Wonder')
  }

  /**
   * Participant stuff
   * */

  createParticipantReally (id, eventId, firstName, lastName, escortFirstName, escortLastName) {
    this.dataParticipants.set(id, new Model(id, eventId, firstName, lastName, escortFirstName, escortLastName))
  }

  retrieveAllParticipants () {
    return Array.from(this.dataParticipants.values())
  }

  retrieveParticipant (id) {
    if (this.dataParticipants.has(id)) {
      return this.dataParticipants.get(id)
    } else {
      throw new Error(`Participant with id ${id} not found`)
    }
  }

  updateParticipant (id, par) {
    if (this.dataParticipants.has(id)) {
      const participant = this.dataParticipants.get(id)
      participant.eventId = par.eventId
      participant.firstName = par.firstName
      participant.lastName = par.lastName
      participant.escortFirstName = par.escortFirstName
      participant.escortLastName = par.escortLastName
      return this.retrieveParticipant(par.id)
    } else {
      throw new Error(`Participant with id ${id} not found`)
    }
  }

  createParticipant (par) {
    if (this.dataParticipants.has(par.id)) {
      throw new Error(`An participant with id ${par.id} already exists`)
    } else {
      this.createParticipantReally(par.id, par.eventId, par.firstName, par.lastName, par.escortFirstName, par.escortLastName)
      return this.retrieveParticipant(par.id)
    }
  }

  deleteParticipant (id) {
    if (this.dataParticipants.has(id)) {
      this.dataParticipants.delete(id)
    } else {
      throw new Error(`Participant with id ${id} not found`)
    }
  }
}
