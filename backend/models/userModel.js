const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location:{
    coordinates:[]
  }
},{timestamps:true});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
