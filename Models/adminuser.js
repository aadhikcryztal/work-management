const mongoose = require('mongoose');

const adminuser = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    password: {
        type : String,
        min : 6,
        required : true
    }
})

module.exports =  mongoose.model("admins" , adminuser);
