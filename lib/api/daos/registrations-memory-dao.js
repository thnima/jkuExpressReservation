import Model from '../models/registration-model'

export default class RegMemoryDao {
  constructor () {
    this.dataReg = new Map()
    this.regCounter = 0

    this.createRegReally(++this.regCounter, 1, 1, true)
    this.createRegReally(++this.regCounter, 2, 1, false)
    this.createRegReally(++this.regCounter, 3, 2, true)
  }

  /**
   * Registrations stuff
   * */

  createRegReally (id, userId, eventId, plusOne) {
    this.dataReg.set(id, new Model(id, userId, eventId, plusOne))
  }

  retrieveAllReg ({userId, eventId}) {
    let result = new Map();

    this.dataReg.forEach((value, key, map) => {
      const filterUserEvent = userId && eventId && value.userId == userId && value.eventId == eventId;
      const filterUser = userId && !eventId && value.userId === userId;
      const filterEvent = eventId && !userId && value.eventId === eventId;

      if (filterUserEvent || filterUser || filterEvent) {
        result.set(key, value);
      }
    });

    return Array.from(result.values());
  }

  retrieveReg (id) {
    if (this.dataReg.has(id)) {
      return this.dataReg.get(id)
    } else {
      throw new Error(`Reg with id ${id} not found`)
    }
  }

  retrieveRegFilter ({userId, eventId}) {

    return Array.from(this.val2key(eventId, this.dataReg))
  }

  val2key (val, array) {
    this.dReg = new Map()
    for (var key in array) {
      if (array[key] === val) {
        this.dReg.set(key, this.retrieveReg(key))
      }
    }
    return false
  }

  updateReg (id, reg) {
    if (this.dataReg.has(id)) {
      const r = this.dataReg.get(id)
      r.userId = reg.userId
      r.eventId = reg.eventId
      r.plusOne = reg.plusOne
      return this.retrieveReg(reg.id)
    } else {
      throw new Error(`Reg with id ${id} not found`)
    }
  }

  createReg (reg) {
    console.log(reg);
    this.createRegReally(++this.regCounter, reg.userId, reg.eventId, reg.plusOne)
    return this.retrieveReg(this.regCounter)
  }

  deleteReg (id) {
    if (this.dataReg.has(id)) {
      this.dataReg.delete(id)
      return id
    } else {
      throw new Error(`Reg with id ${id} not found`)
    }
  }
}
