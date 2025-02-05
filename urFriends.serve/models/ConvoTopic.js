const mongoose = require("mongoose");

const convoTopicSchema = new mongoose.Schema({
  topic: String,
  date: String,
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
/* 
convoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
}); */

const ConvoTopic = mongoose.model("convoTopic", convoTopicSchema);

module.exports = ConvoTopic;
