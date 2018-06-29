'use strict';

process.env.NODE_ENV = 'test';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('Express static', function () {
  it('GET request "/" should return the index page', function () {
    return chai.request(app)
      .get('/')
      .then(res => {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('404 handler', function () {
  it('should respond with 404 when given a bad path', function () {
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
});

describe('GET /api/notes handler', function () {
  it('should return default 10 objects', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(res => {
        //console.log('Hellooooo', res.body.length);
        expect(res.body).to.have.length(10);
      });
  });

  it('should return arr of obj w/ id, title, content', function () {
    return chai.request(app)
      .get('/api/notes')
      .then(res => {
        res.body.forEach(item =>{
          expect(item).to.include.keys('id', 'title', 'content');
        });
      });
  });

  it('should return correct search results for valid query', function () {
    return chai.request(app)
      .get('/api/notes?searchTerm=blame')
      .then(res => {
        expect(res.body.length).to.equal(1);
      });
  });

  it('should return empty array for invalid query', function () {
    return chai.request(app)
      .get('/api/notes?searchTerm=QUETZALCOATLINMYCLOSET')
      .then(res => {
        expect(res.body.length).to.equal(0);
      });
  });
});

describe('GET /api/notes/:id handler', function () {
  it('should return correct note obj w/ id, title, content for given id', function () {
    return chai.request(app)
      .get('/api/notes/1000')
      .then(res => {
        expect(res.body.id).to.equal(1000);
        expect(res.body.title).to.equal('5 life lessons learned from cats');
        expect(res.body.content).to.equal(loremIpsum);
      });
  });

  it('should respond w/ 404 for invalid id', function () {
    return chai.request(app)
      .get('/api/notes/9001')
      .then(function (res) {
        expect(res).to.have.status(404);
      });
  });
});

describe('POST /api/notes handler', function(){

  it('should create/return new item w/ loc header when passed valid data', function () {
    const newObj = {title: 'Local Man Praises Sun', content: 'Ah, hello! You don\'t look hollow, far from it!'};
    return chai.request(app)
      .post('/api/notes/')
      .send(newObj)
      .then(res => {
        expect(res.header.location).to.exist;
        expect(res.body.id).to.exist;
        expect(res.body.title).to.equal(newObj.title);
        expect(res.body.content).to.equal(newObj.content);
      });
  });

  it('should return object with appropriate msg when missing title', function () {
    const newObj = {title: '', content: 'Ah, hello! You don\'t look hollow, far from it!'};
    return chai.request(app)
      .post('/api/notes/')
      .then(res => {
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});

describe('PUT /api/notes/:id handler', function(){

  it('should update/return note object when given valid data', function () {
    const key = 1002;
    const newObj = {title: 'Local Man Finishes Quest to Light Self on Fire', content: 'THE LEGEND NEVER DIES'};
    return chai.request(app)
      .put(`/api/notes/${key}`)
      .send(newObj)
      .then(res => {
        expect(res.body.id).to.equal(key);
        expect(res.body.title).to.equal(newObj.title);
        expect(res.body.content).to.equal(newObj.content);
      });
  });

  it('should respond with 404 for invalid id', function () {
    const newObj = {title: 'Local Man Finishes Quest to Light Self on Fire', content: 'THE LEGEND NEVER DIES'};
    const key = 9001;
    return chai.request(app)
      .put(`/api/notes/${key}`)
      .send(newObj)
      .then(res => {
        expect(res).to.have.status(404);
      });
  });
  
  it('should return object with appropriate msg when missing title', function () {
    const newObj = {title: '', content: 'THE LEGEND NEVER DIES'};
    const key = 1003;
    return chai.request(app)
      .put(`/api/notes/${key}`)
      .send(newObj)
      .then(res => {
        console.log(res.body);
        expect(res.body.message).to.equal('Missing `title` in request body');
      });
  });
});

describe('DELETE /api/notes/:id handler', function(){
  it('should delete item by id', function () {
    const key = 1000;
    return chai.request(app)
      .delete(`/api/notes/${key}`)
      .then(res => {
        expect(res.body).to.equal(1);
      });
  });
});






