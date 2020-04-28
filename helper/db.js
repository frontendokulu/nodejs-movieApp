const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds031978.mlab.com:31978/heroku_zxpw772f',
        { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex : true, useFindAndModify :false });
    mongoose.connection.on('open', () => {
       console.log('MongoDB connection ok!');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Error', err);
    });
};