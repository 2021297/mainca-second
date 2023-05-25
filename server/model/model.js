const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    contact : {
        type : String
    },
    address : {
        type : String
    },
    BMI : {
        type :String
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;