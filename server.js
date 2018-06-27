'use strict';

// Load array of notes
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

//Other setup
const { PORT } = require('./config');
// const logger = require('./middleware/logger.js');
// app.use(logger.logRequest);

const morgan = require('morgan');
app.use(morgan('dev'));

// ADD STATIC SERVER HERE
app.use(express.static('public'));

// Parse request body
app.use(express.json());


// Endpoints
app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

app.get('/api/notes/:id', (req, res, next) => {
  const {id} = req.params;

  notes.find(id, (err, item) => {
    if (err) {
      return next(err); // goes to error handler
    }
    if(item){
      res.json(item); //return found item
    }else{
      res.send('Item not found');
    }
  });
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  console.log(req.body);
  console.log(updateObj);

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});


// 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

//Errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listener
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});


