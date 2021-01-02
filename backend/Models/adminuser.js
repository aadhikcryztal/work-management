const mongoose = require('mongoose');

const profilecreation = new mongoose.Schema({
    first_name : {
        type: String,
        required : true
    },
    last_name : {
        type: String,
        required : true
    },
    company_name : {
        type: String,
        required : true
    },
    domain_name : {
        type: String,
        required : true
    },
    location : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password: {
        type : String,
        min : 6,
        required : true
    },
    no_of_employees : {
        type: String,
        required : true
    },
})

module.exports =  mongoose.model("profilecreation" , profilecreation);
