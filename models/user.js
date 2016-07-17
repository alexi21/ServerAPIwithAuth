const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our user model
// Ensure email is both unique and is saved in lower case

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Create the model class

const User = mongoose.model('user', userSchema);

// Export the model

module.exports = User;
