const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name : {
        type : String,
        maxlength : 60,
        minlength : 2
    },

    surname : {
        type : String,
        maxlength : 60,
        minlength : 2
    },
    bio : {
        type : String,
        maxlength : 600,
        minlength : 5
    },
    createdAt : {
        type: Date,
        default : Date.now
    }
});

mongoose.Promise = global.Promise;


module.exports = mongoose.model('Director',DirectorSchema);