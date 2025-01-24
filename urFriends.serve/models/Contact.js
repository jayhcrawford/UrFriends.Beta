const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

console.log("connecting to MongoDB...");

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB from models/contact.js");
  })
  .catch((error) => {
    console.log(
      "error connecting to MongoDB in models/contact.js:",
      error.message
    );
  });

const contactSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
    },
    last: {
      type: String,
    },
  },
  tier: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  lastConvo: {
    type: Array,
    default: null,
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
