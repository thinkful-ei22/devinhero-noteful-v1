'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('government', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1003, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1001, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

const createObj ={
  title: 'Solaire Greeting', 
  content: `Ah, hello! You don't look Hollow, far from it! I am Solaire of Astora, an adherent of the Lord of Sunlight. Now that I am Undead, I have come to this great land, the birthplace of Lord Gwyn, to seek my very own sun! ...Do you find that strange? Well, you should! No need to hide your reaction. I get that look all the time! Hah hah hah!`
};

notes.create(createObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log('created: ', item);
  } else {
    console.log('not found');
  }
});

notes.find(1010, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log('found: ', item);
  } else {
    console.log('not found');
  }
});

notes.delete(1010, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log('deleted: ', item);
  } else {
    console.log('not found');
  }
});


notes.find(1010, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log('found: ', item);
  } else {
    console.log('not found');
  }
});