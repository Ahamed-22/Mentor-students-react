const mongoose = require('mongoose');
const UserSchema = require('./students.schema');

const studentSchema = mongoose.model("student" , UserSchema);
module.exports = studentSchema;