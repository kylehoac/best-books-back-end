'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT


app.get('/',(request, response) => {
    response.send('hi');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));