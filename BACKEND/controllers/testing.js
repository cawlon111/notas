const testingRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

testingRouter.post('/users', async (request, response) => {
  const { username, password, name } = request.body
  
  const bcrypt = require('bcrypt')
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    name,
    passwordHash
  })
  
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = testingRouter
