'use strict';

// // Load array of notes
// const data = require('./db/notes');
// const simDB = require('./db/simDB');
// const notes = simDB.initialize(data);

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

// Setup Router
const notesRouter = require('./router/notes.router');

//Other setup
const { PORT } = require('./config');

//Logging
// const logger = require('./middleware/logger.js');
// app.use(logger.logRequest);

const morgan = require('morgan');
if(process.env.NODE_ENV !== 'test'){
  app.use(morgan('dev'));
}

// ADD STATIC SERVER HERE
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Parse request body
app.use(express.json());


//Router
app.use('/api', notesRouter);


// Listen for incoming connections
if (require.main === module) {
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app; // Export for testing

