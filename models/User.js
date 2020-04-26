const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique :true,
        maxlength : 60,
        minlength : 3
    },
    password : {
        type : String,
        maxlength : 100,
        minlength : 5
    },

});

mongoose.Promise = global.Promise;


module.exports = mongoose.model('User',UserSchema);