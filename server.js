'use strict';
//dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3003
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
//
//components
const User = require('./models/schemas.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

const book1 = new User({
    email: 'dionjwa@gmail.com',
    books: [
        {name: 'potato',
        description: 'potato book',
        status: 'baked'},
        {name: 'banana',
        description: 'banana book',
        status: 'peeled'
        },
        {name: 'bingo',
        description: 'dawg',
        status: 'Farm Animal'
        }
    ]
});
book1.save();
// console.log({ book1 });
//
//apps
app.get('/books', getSchemasDB)
function getSchemasDB(request, response) {
    const email = request.query.email;
    console.log(email);
    User.find({ email }, (err, client) => {
        if (err) return console.error(err);
        console.log({ client });
        response.send(client.length ? client[0].books : 'No books');
      }) 
}

app.get('*', (request, response) => {
    response.status(400, 404, 500).send('Error: Book not Found');
});
//
//POL
app.get('/', (request, response) => {
    response.send('hi');
})
//