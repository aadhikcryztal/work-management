const mongoose = require('mongoose');

const comments = new mongoose.Schema({
    announcement_id : {
        type: String,
        required : true
    },
    comments : {
        type : String,
        required : true
    }
})

module.exports =  mongoose.model("comments" , comments);
