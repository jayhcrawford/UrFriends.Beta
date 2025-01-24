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

//PATCH contact tier/settings updates
settingsRouter.patch("/", async (request, response) => {
  const verify = jwt.verify(request.body.token, process.env.SECRET);

  console.log(request.body)

  //If settings need to be changed, change them
  if (request.body.settings != null) {

    const udpateSettings = await UserData.findOneAndUpdate(
      { user: verify.id },
      { tierTime: request.body.settings }
    );
  }

  //if there are any contact's tiers to change
  if (request.body.phonebook.length != 0) {
    //update them
    for (let i = 0; i < request.body.phonebook.length; i++) {
      const udpatedContact = await Contact.findOneAndUpdate(
        { _id: request.body.phonebook[i].id },
        { ...request.body.phonebook[i] }
      );
    }
  }

  response.status(200).json({ success: "success" });
});

module.exports = settingsRouter;
