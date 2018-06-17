import EventsMemoryDao from './events-memory-dao'
import UsersMemoryDao from './users-memory-dao'
import RegMemoryDao from './registrations-memory-dao'

let memoryDAO = null
let memoryDAO2 = null
let memoryDAO3 = null

export function getInstance (type) {
  if (type === 'events') {
    if (memoryDAO === null) {
      memoryDAO = new EventsMemoryDao()
    }
    return memoryDAO
  }
  if (type === 'users') {
    if (memoryDAO2 === null) {
      memoryDAO2 = new UsersMemoryDao()
    }
    return memoryDAO2
  }
  if (type === 'registrations') {
    if (memoryDAO3 === null) {
      memoryDAO3 = new RegMemoryDao()
    }
    return memoryDAO3
  }
  throw new Error('Unknown DAO type ' + type)
}
