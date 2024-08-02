const mongoose = require('mongoose')


const studentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    mentors : {
        type : Array,
        default : []
    },
    studentId : {
        type : String,
        required : false
    }
},{
    timestamps : true
})

module.exports = studentSchema;