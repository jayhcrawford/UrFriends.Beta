require("dotenv").config();
const phonebookRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Contact = require("../models/contact.js");
const UserData = require("../models/userData.js");
const ConvoTopic = require("../models/ConvoTopic.js");

//Get users phonebook and settings
phonebookRouter.post("/getContent", async (request, response) => {
  const verified = jwt.verify(request.body.user.token, process.env.SECRET);
  const id = verified.id;

  const settings = await UserData.findOne({ user: id });
  const phonebook = await Contact.find({ user: id });
  response.json({ phonebook: phonebook, settings: settings });
});

//add a new contact
phonebookRouter.post("/", async (request, response) => {
  const newContact = new Contact(request.body);
  const result = await newContact.save();
  response.status(200).json(result);
});

//delete a contact
phonebookRouter.delete("/:id", async (request, response, next) => {
  try {
    await Contact.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

//add a conversation
phonebookRouter.patch("/patchConversation", async (request, response) => {
  const update = await Contact.findOneAndUpdate(
    { _id: request.body.id },
    { lastConvo: request.body.lastConvo }
  );
  response.status(200).json(update);
});

//change a conversation
phonebookRouter.patch("/updateConversation", async (request, response) => {
  try {
    let person = await Contact.findOne({ _id: request.body.person });
    const convoToUpdate = person.lastConvo.id(request.body._id);
    convoToUpdate.topic = request.body.topic;

    await person.save();
    response.status(200).json({ convoToUpdate });
  } catch (error) {
    console.log(error);
    return error;
  }
});

//change a tier name
phonebookRouter.post("/changeTierName", async (request, response) => {
  console.log(request)
  try {
    response.status(200).json({ success: "success" });
  } catch (error) {
    console.log(error);
    return error;
  }
});




//generic, unused
phonebookRouter.post("/updateMany", async (request, response) => {
  response.status(204).end();
});

module.exports = phonebookRouter;
