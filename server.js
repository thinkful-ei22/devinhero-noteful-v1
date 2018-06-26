'use strict';

// Load array of notes
const data = require('./db/notes');
const { PORT } = require('./config');
console.log('Hello Noteful  !');


// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

const logger = require('./middleware/logger.js');


// ADD STATIC SERVER HERE


app.use(logger.logRequest);

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  //console.log('Search term: ', searchTerm);
  if(searchTerm){
    const filterData = data.filter(item => item.title.includes(searchTerm));
    res.json(filterData);
  }else{
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const item = data.find(item => item.id === Number(req.params.id));
  //console.log('item: ', item);
  res.json(item);
});

// app.get('/boom', (req, res, next) => {
//   throw new Error('Boom!!');
// });

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
