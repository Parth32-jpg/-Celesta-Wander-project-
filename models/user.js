const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userschema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// Apply the passportLocalMongoose plugin to the schema
userschema.plugin(passportLocalMongoose);

// Define the User model using the schema
const User = mongoose.model("User", userschema);

// Export the User model
module.exports = User;
