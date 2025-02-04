const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../models/user");
const Contact = require("../models/contact.js");
const UserData = require("../models/userData");
var cookieParser = require("cookie-parser");

loginRouter.post("/", (request, response, next) => {
  response.cookie("Jay", "Poops", {
    sameSite: "none",
    secure: true,
    httpOnly: true
  });

  response.cookie("He does it", "Poops", {
    sameSite: "none",
    secure: true,
  });
  
  next();
});

//login
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcryptjs.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  const phonebook = await Contact.find({ user: user._id });
  const settings = await UserData.find({ user: user._id });

  const tokenCookie = {
    token,
    username: user.username,
    name: user.name,
    id: user._id,
  };

  response.status(200).send({
    user: { token, username: user.username, name: user.name, id: user._id },
    phonebook: phonebook,
    settings: settings,
  });
});

module.exports = loginRouter;
