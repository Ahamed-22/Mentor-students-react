const mongoose = require('mongoose');
const userSchema = require('./mentors.schema')

const mentorSchema = mongoose.model("mentor" , userSchema);
module.exports = mentorSchema;