const express = require("express");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");

const phonebookRouter = require("./controllers/phonebook");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const settingsRouter = require("./controllers/settings");

const requestLogger = require("./utils/logger");




app.use(requestLogger);

/* app.post("/api/login", (request, response, next) => {
  response.cookie("Jay", "Jay", {
    sameSite: "none",
    secure: true
  });

  console.log("COOKIE");
  next();
}); */


app.use(cookieParser("SECRET"));

/* 
// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
    console.log(res.cookie)
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});

 */

app.use(
  cors({
    origin: "https://localhost:80",
    credentials: true,
  })
);
app.use(express.json());



app.use("/api/settings", settingsRouter);
app.use("/api/phonebook", phonebookRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);


module.exports = app;
