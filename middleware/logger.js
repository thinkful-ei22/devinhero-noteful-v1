/* global app */
'use strict';

function logRequest(req, res, next){
  const date = new Date().toLocaleString();
  console.log(`${date} ${req.method} ${req.url}`);
  next();
}

module.exports = {logRequest};
