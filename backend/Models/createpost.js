const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const Createpost = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  location: {
    type : String
  },
  expires_on : {
    type : String,
  },
  description : {
    type : String,
    required : true
  },
  notify_to : {
    type : Array
  }
});

module.exports = mongoose.model("collections", Createpost);
