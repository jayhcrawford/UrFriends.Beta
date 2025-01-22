const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const UserData = require('../models/userData')

//get all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

//create a new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  console.log(request.body)

  //validate username and password length >= 3
  if (username.length >= 3 && password.length >= 3) {
    try {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username,
        name,
        passwordHash,
      })

      const savedUser = await user.save()

      const defaultSettings = new UserData({
        user: savedUser._id,
        tierTime: {
          "1": "1m",
          "2": "2m",
          "3": "3m",
          "4": "4m",
          "5": "5m"
        }
      })

      const savedSettings = await defaultSettings.save()

      response.status(201).json(savedUser)
    } catch (error) {
      response.status(404).json({
        message: 'An undefined error related to POSTing user occured',
      })
      console.log('The error message is: ', error.message)
    }
  } else {
    response
      .status(403)
      .json({ message: 'Username or Password is of length less than 3' })
  } 
})

//delete a user
//TODO: Delete their contacts as well
usersRouter.delete('/:id', async (request, response, next) => {
  try {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
