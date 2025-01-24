require("dotenv").config();
const phonebookRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Contact = require("../models/contact.js");
const UserData = require("../models/userData.js");

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

  console.log(result);
  response.status(200).json(request.body);
});

//add a conversation
phonebookRouter.patch("/patchConversation", async (request, response) => {
  console.log(request.body);
  const update = await Contact.findOneAndUpdate(
    { _id: request.body.id },
    { lastConvo: request.body.lastConvo }
  );
  response.status(200).json(update);
});

phonebookRouter.post("/updateMany", async (request, response) => {
  const everyoneToChange = await Contact.find({});
  let listOfIDs = [];
  everyoneToChange.forEach((person) => {
    listOfIDs.push(person._id.toString());
  });

  for (let i = 0; i < listOfIDs.length; i++) {
    const personToChange = await Contact.findOne({ _id: listOfIDs[i] });

    const change = {
      name: {
        first: personToChange.name,
        last: "Jones",
      },
    };

    const changeItNow = await Contact.findByIdAndUpdate(
      { _id: listOfIDs[i] },
      change
    );
  }

  response.status(204).end();
});

module.exports = phonebookRouter;
