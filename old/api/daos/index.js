import EventsMemoryDao from './events-memory-dao'
import ParticipantsMemoryDao from './participants-memory-dao'

let memoryDAO = null
let memoryDAO2 = null

export function getInstance (type) {
  if (type === 'events') {
    if (memoryDAO === null) {
      memoryDAO = new EventsMemoryDao()
    }
    return memoryDAO
  }
  if (type === 'participants') {
    if (memoryDAO2 === null) {
      memoryDAO2 = new ParticipantsMemoryDao()
    }
    return memoryDAO2
  }
  throw new Error('Unknown DAO type ' + type)
}
