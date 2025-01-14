import "dotenv/config";
import mongoose, { model } from "mongoose";

const url = process.env.MONGO_URI;

const Contact = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  lastConvo: { type: Array },
});

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB from models/contact.js");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
Contact.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Entry = mongoose.model("Contact", Contact);

export const schema = model.schema;
export { Entry };
