require("dotenv").config();
const settingsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const UserData = require("../models/userData.js");

//get user's userData
settingsRouter.get("/userData/:id", async (request, response) => {
  const phonebook = await UserData.findOne({ user: request.params.id });
  response.json(phonebook);
});

//TODO: Convert to patch settings
settingsRouter.patch("/", async (request, response) => {
  console.log(request.body);
  // const update = await UserData.findOneAndUpdate(  );
  response.status(200).json({ success: "success" });
});

module.exports = settingsRouter;
