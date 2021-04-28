'use strict';
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    status: {type: String}
});

const userSchema = new mongoose.Schema({
    email: {type: String} ,
    books: [bookSchema]
});

const User = mongoose.model('User', userSchema)

const userModel = new User({
    email: 'potato@potato.com',
    books: [
        {name: 'potato',
        description: 'potato book',
        status: 'baked'},
        {name: 'banana',
        description: 'banana book',
        status: 'peeled'
        }
    ]
});
userModel.save()


module.exports = mongoose.model('User', userSchema);