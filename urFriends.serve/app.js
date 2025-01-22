const express = require('express')
const app = express()
const cors = require('cors')

const phonebookRouter = require('./controllers/phonebook')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const settingsRouter = require('./controllers/settings')

const requestLogger = require('./utils/logger')

app.use(requestLogger)

app.use(cors())
app.use(express.json())
app.use('/api/settings', settingsRouter)
app.use('/api/phonebook', phonebookRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
