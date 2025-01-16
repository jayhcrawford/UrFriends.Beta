import express from "express";
import "dotenv/config";
const uri = process.env.MONGO_URI;
import axios from "axios";
import { Entry } from "./models/contact.js";
import cors from "cors";

import { requestLogger } from "./utils/logger.js";

const app = express();
app.use(express.json());
app.use(cors());
//app.use(requestLogger);

app.get("/phonebook", (request, response) => {
  Entry.find({}).then((contacts) => {
    return response.status(200).json(contacts);
  });
});

// Routes
app.get("/", (request, response) =>
  response.send('<a href="/phonebook"><button>View The Phonebook</button></a>')
);

app.post('/reset', async (request, response) => {
  await Entry.deleteMany({})
  response.status(204).end()
})

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
