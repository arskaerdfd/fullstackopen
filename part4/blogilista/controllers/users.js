const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if ( username.length < 3 | name.length < 3) {
    return response.status(400).json({error: "username or name less than 3 characters"})
  }

  const oldUsers = await User.find({})
  const oldUsernames = oldUsers.map(user => user.username)

  if (oldUsernames.includes(username)) {
    return response.status(400).json({ error: "username already exists"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter