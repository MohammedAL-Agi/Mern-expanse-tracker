const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'});

connectDB();

const transactions =  require('./routes/transactions');
const e = require('express');

const app = express();

// to allow us to use body parser
app.use(express.json());

if(process.env.NONE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions )

if(process.env.NONE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running in ${process.env.NONE_ENV} mode on port ${PORT}`.magenta.bold))