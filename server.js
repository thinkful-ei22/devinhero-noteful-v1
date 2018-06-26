'use strict';

// Load array of notes
const data = require('./db/notes');
const { PORT } = require('./config');
console.log('Hello Noteful!');


// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express(); 

// ADD STATIC SERVER HERE

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  console.log(searchTerm);
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