require('dotenv').config()
const phonebookRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Contact = require('../models/contact.js')
const UserData = require('../models/userData.js')

phonebookRouter.post('/reset', async (request, response) => {
  await Contact.deleteMany()
  response.status(204).end()
})

/* 
//get all contacts
phonebookRouter.get('/', async (request, response) => {
  const phonebook = await Contact.find({})
  response.json(phonebook)
})
 */

//get user contacts
phonebookRouter.get('/:id', async (request, response) => {
  const phonebook = await Contact.find({ user: request.params.id })
  response.json(phonebook)
})

//get all contacts
phonebookRouter.get('/string', async (request, response) => {
  const phonebook = await UserData.find({})
  response.json(phonebook)
})

//get user's userData
phonebookRouter.get('/userData/:id', async (request, response) => {
  const phonebook = await UserData.findOne({ user: request.params.id })
  response.json(phonebook)
})

phonebookRouter.post('/', async (request, response) => {
  const newContact = new Contact(request.body);
  const result = await newContact.save();

  console.log(result)
  response.status(200).json(request.body)
})

phonebookRouter.post('/updateMany', async (request, response) => {
  //put edits here using .updateMany
  response.status(204).end()

})

module.exports = phonebookRouter

