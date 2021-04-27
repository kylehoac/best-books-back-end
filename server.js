'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

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
console.log(userModel);
// const Books = mongoose.model('Books', userSchema);



app.get('/',(request, response) => {
    response.send('hi');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// Referenced code on mongoosejs.com quick start guide