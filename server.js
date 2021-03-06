'use strict';
//dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

app.use(express.json())

// MongoDb / Mongoose 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

// User instances
const User = require('./models/schemas.js');

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

const book2 = new User({
    email: 'hoackyle@gmail.com',
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
// book1.save();
// book2.save();

// Routes
app.get('/books', getSchemasDB)
app.get('*', errorHandler)
app.get('/', proofOfLife)
app.post('/books', postHandler)
app.put('/books/:index', updateBook)
app.delete('/books/:index', deleteBook)

// Route handlers
async function deleteBook (request, response){
    const index = Number(request.params.index);
    const email = request.query.email;

    await User.find({email}, (err, users) => {
        if (err) console.error(err);
        const user = users[0];
        user.books.filter((_, i) => i !== index);
        user.save();
        response.send('Boy Bye!')
    })
}

    async function updateBook(request, response){
        const index = Number(request.params.index);
        const newBook = request.body.newBook;
        const email = request.query.email;
    
        await User.find({email}, (err, users) => {
            if (err) console.error(err);
            const user = users[0];
            user.books.splice(index, 1, newBook)
            user.save();
            response.send('You Did It!')
        })
    }


async function postHandler(request, response) {
    console.log(request.body);
    const { name, description, status } = request.body.newBook;
    const { email } = request.body;
    console.log({email});
    await User.find({ email }, (err, users) => {
        if (users.length){
            const user = users[0];

            const currentBooks = user.books;

            const newBooks = {name: name, description: description, status: status};

            currentBooks.push(newBooks);

            user.save();

            response.send(user.books);
        } else {
            response.send('no users found with that name')
        }
    }
)}

function getSchemasDB(request, response) {
    const email = request.query.email;
    console.log(email);
    User.find({ email }, (err, client) => {
        if (err) return console.error(err);
        console.log({ client });
        response.send(client.length ? client[0].books : 'No books');
      }) 
}

function errorHandler(request, response) {
    response.status(400, 404, 500).send('Error: Book not Found');
}

function proofOfLife(request, response) {
    response.send('hi');
}

// Port and listener
const PORT = process.env.PORT || 3003
app.listen(PORT, () => console.log(`listening on port ${PORT}`));