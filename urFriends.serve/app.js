const express = require('express')
const app = express()
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:5173', // Or '*' for all origins (not recommended for production)
  methods: ['POST', 'PATCH', 'GET'], // Or a list of allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Or a list of allowed headers 
  credentials: true, // Required if you're sending cookies
};

const phonebookRouter = require('./controllers/phonebook')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const settingsRouter = require('./controllers/settings')
const authReciever = require('./controllers/authReciever')

const requestLogger = require('./utils/logger')

app.use(requestLogger)

app.use(cors(corsOptions))

app.use(express.json())
app.use('/', authReciever)
app.use('/api/settings', settingsRouter)
app.use('/api/phonebook', phonebookRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
