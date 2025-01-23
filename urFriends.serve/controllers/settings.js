require("dotenv").config();
const settingsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const UserData = require("../models/userData.js");
const Contact = require("../models/contact.js");

//get user's userData
settingsRouter.get("/userData/:id", async (request, response) => {
  const phonebook = await UserData.findOne({ user: request.params.id });
  response.json(phonebook);
});

//TODO: Convert to patch settings
settingsRouter.patch("/", async (request, response) => {
  console.log(request.body);

  //TODO: updates to settings

  //updates to contacts
  for (let i = 0; i < request.body.phonebook.length; i++) {
    const udpatedContact = await Contact.findOneAndUpdate(
      { _id: request.body.phonebook[i].id },
      { ...request.body.phonebook[i] }
    );
  }

  response.status(200).json({ success: "success" });
});

module.exports = settingsRouter;
