const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Note = require('../models/note')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
  let token = null
  let userId = null

  beforeEach(async () => {
    await Note.deleteMany({})
    await User.deleteMany({})

    // Crear un usuario para las pruebas
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'testuser', passwordHash })
    await user.save()
    userId = user._id

    // Hacer login para obtener token
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'secret' })
    
    token = loginResponse.body.token

    // Crear notas iniciales asociadas al usuario
    const noteObjects = helper.initialNotes.map(note => ({
      ...note,
      user: userId
    }))
    
    const promiseArray = noteObjects.map(note => new Note(note).save())
    await Promise.all(promiseArray)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    expect(contents).toContain('Browser can execute only JavaScript')
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data and valid token', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      expect(contents).toContain('async/await simplifies making async calls')
    })

    test('fails with status code 401 if token not provided', async () => {
      const newNote = {
        content: 'this should fail',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(401)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid and user is creator', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

      const contents = notesAtEnd.map(n => n.content)
      expect(contents).not.toContain(noteToDelete.content)
    })

    test('fails with status code 401 if token not provided', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(401)
    })
  })

  describe('updating a note', () => {
    test('succeeds with valid token', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToUpdate = notesAtStart[0]

      const updatedNote = {
        content: noteToUpdate.content,
        important: false
      }

      await api
        .put(`/api/notes/${noteToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedNote)
        .expect(200)

      const notesAtEnd = await helper.notesInDb()
      const updated = notesAtEnd.find(n => n.id === noteToUpdate.id)
      expect(updated.important).toBe(false)
    })

    test('fails with status code 401 if token not provided', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToUpdate = notesAtStart[0]

      const updatedNote = {
        content: noteToUpdate.content,
        important: false
      }

      await api
        .put(`/api/notes/${noteToUpdate.id}`)
        .send(updatedNote)
        .expect(401)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})