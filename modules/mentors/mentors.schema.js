const mongoose = require('mongoose')


const mentorSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    batchName : {
        type : String,
        required : false
    },
    students : {
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

module.exports = mentorSchema;