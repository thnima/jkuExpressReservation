import Model from '../models/user-model'

export default class UsersMemoryDao {
  constructor () {
    this.dataParticipants = new Map()
    this.userCounter = 0

    this.createParticipantReally(++this.userCounter, 'Phil Art', true)
    this.createParticipantReally(++this.userCounter, 'And Art', false)
    this.createParticipantReally(++this.userCounter, 'Mat Art', false)
  }

  /**
   * Participant stuff
   * */

  createParticipantReally (id, userName, isAdmin) {
    this.dataParticipants.set(id, new Model(id, userName, isAdmin))
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
      participant.isAdmin = par.isAdmin
      participant.userName = par.userName
      return this.retrieveParticipant(par.id)
    } else {
      throw new Error(`Participant with id ${id} not found`)
    }
  }

  createParticipant (par) {
    let userIdToCheck;
    let userExists = false;

    this.dataParticipants.forEach((value, key, map) => {
      if (value.userName === par.userName) {
        userIdToCheck = value.id;
        userExists = true;
      }
    });

    if (!userExists) {
      this.createParticipantReally(++this.userCounter, par.userName, par.isAdmin);
      userIdToCheck=this.userCounter;
    }


    return this.retrieveParticipant(userIdToCheck);
  }

  deleteParticipant (id) {
    if (this.dataParticipants.has(id)) {
      this.dataParticipants.delete(id)
      return id
    } else {
      throw new Error(`Participant with id ${id} not found`)
    }
  }
}
