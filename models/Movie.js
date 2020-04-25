const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id : Schema.Types.ObjectId,
    title : {
        type :String,
        required :[true, '`{PATH} alanı zorunludur.'],
        maxlength : [30, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden az olmak zorundadır.'],
        minlength : [1, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden fazla olmak zorundadır.']
    },
    category : {
        type: String,
        required :[true, '`{PATH} alanı zorunludur.'],
        maxlength : [80, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden az olmak zorundadır.'],
        minlength : [4, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden fazla olmak zorundadır.']
    },
    country : {
        type : String,
        required :[true, '`{PATH} alanı zorunludur.'],
        maxlength : [50, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden az olmak zorundadır.'],
        minlength : [3, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden fazla olmak zorundadır.']
    },
    year : {
        type : Number,
        maxlength : [2020, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden az olmak zorundadır.'],
        minlength : [1900, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden fazla olmak zorundadır.']
    },

    imdb_score : {
        type : Number,
        maxlength : [10, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden az olmak zorundadır.'],
        minlength : [0, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden fazla olmak zorundadır.']
    },
    createdAt : {
        type: Date,
        default : Date.now
    }
});

mongoose.Promise = global.Promise;


module.exports = mongoose.model('Movie',MovieSchema);