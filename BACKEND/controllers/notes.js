const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const { tokenExtractor, userExtractor } = require('../middleware/auth')

// Obtener todas las notas (público)
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1 })
  response.json(notes)
})

// Obtener una nota específica (público)
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

// Crear nota (requiere autenticación)
notesRouter.post('/', tokenExtractor, userExtractor, async (request, response, next) => {
  const body = request.body

  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.user.id)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  try {
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

// Eliminar nota (solo el creador)
notesRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    
    if (!note) {
      return response.status(404).json({ error: 'note not found' })
    }

    if (!request.user || note.user.toString() !== request.user.id.toString()) {
      return response.status(401).json({ error: 'only the creator can delete this note' })
    }

    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// Actualizar nota (solo el creador)
notesRouter.put('/:id', tokenExtractor, userExtractor, async (request, response, next) => {
  const body = request.body

  try {
    const note = await Note.findById(request.params.id)

    if (!note) {
      return response.status(404).json({ error: 'note not found' })
    }

    if (!request.user || note.user.toString() !== request.user.id.toString()) {
      return response.status(401).json({ error: 'only the creator can edit this note' })
    }

    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      { content: body.content, important: body.important },
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter