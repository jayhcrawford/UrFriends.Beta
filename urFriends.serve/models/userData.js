const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  phonebookData: String,
});

userDataSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const UserData = mongoose.model("userData", userDataSchema);

module.exports = UserData
