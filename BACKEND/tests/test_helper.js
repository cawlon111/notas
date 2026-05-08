const User = require('../models/user')
const Note = require('../models/note')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(n => n.toJSON())
}

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

module.exports = {
  usersInDb,
  notesInDb,
  initialNotes
}