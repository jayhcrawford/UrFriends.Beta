const authRouter = require("express").Router();


authRouter.get("/auth_reciever", async (request, response) => {
  console.log("auth recieved")
  response.redirect("http://localhost:5173/")

});

module.exports = authRouter;
