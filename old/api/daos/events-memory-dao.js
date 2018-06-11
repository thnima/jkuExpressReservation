import Model from '../models/event-model'

export default class EventsMemoryDao {
  constructor () {
    this.data = new Map()

    this.createEventReally(1, 'Abschlussfeier', Date.now(), 'Uni', 'Keine Beschreibung', 9001)
    this.createEventReally(2, 'Eröffnung der Fabrik', Date.now(), 'SP3', 'Eine Beschreibung', 9)
    this.createEventReally(3, 'Verabschiedung von Mr. X', Date.now(), 'SP2', '!Beschreibung', 1)
  }

  /**
   * Event stuff
   * */

  createEventReally (id, title, date, location, description, maxMember) {
    this.data.set(id, new Model(id, title, date, location, description, maxMember))
  }

  retrieveAllEvents () {
    return Array.from(this.data.values())
  }

  retrieveEvent (id) {
    if (this.data.has(id)) {
      return this.data.get(id)
    } else {
      throw new Error(`Event with id ${id} not found`)
    }
  }

  updateEvent (id, ev) {
    if (this.data.has(id)) {
      const event = this.data.get(id)
      event.title = ev.title
      event.date = ev.date
      event.location = ev.location
      event.description = ev.description
      event.maxMember = ev.maxMember
      return this.retrieveEvent(event.id)
    } else {
      throw new Error(`Event with id ${id} not found`)
    }
  }

  createEvent (event) {
    if (this.data.has(event.id)) {
      throw new Error(`An event with id ${event.id} already exists`)
    } else {
      this.createEventReally(event.id, event.title, event.date, event.location, event.description, event.maxMember)
      return this.retrieveEvent(event.id)
    }
  }

  deleteEvent (id) {
    if (this.data.has(id)) {
      this.data.delete(id)
    } else {
      throw new Error(`Event with id ${id} not found`)
    }
  }
}
