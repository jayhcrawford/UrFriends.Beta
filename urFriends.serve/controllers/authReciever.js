const { URLSearchParams } = require("node:url");

const authRouter = require("express").Router();

const cors = require("cors");

authRouter.post("/auth_reciever", async (request, response) => {
  console.log("auth recieved")
  const params = new URLSearchParams(); 

  console.log(params)
  console.log(request.body)
  response.redirect("http://localhost:5173/")

});

module.exports = authRouter;
