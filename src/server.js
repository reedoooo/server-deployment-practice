'use strict';

// libraries
require('dotenv').config();
const express = require('express'); // server
const app = express();
const cors = require('cors'); // security

app.use(cors());

// routes
app.get('/', renderHome);
app.get('/data', renderData);
app.get('/bad', (req, res, next) => {
  // anytime you put anything inside of the next(), it will throw an error
  next('you messed up');
})

// callback functions
function renderHome(req, res){
  res.status(200).send('Hello World');
}

function renderData(req, res, next){
  let outputObj = {
    even: "even",
    odd: "odd",
    "time": req.timestamp // we got this from the middleware
  }

  res.status(200).json(outputObj);
}

function notFound(req, res){
  res.status(404).send('not found');
}

function handleServerError(error, req, res, next){
  res.status(500).send({
    error: 500, 
    route: req.path, 
    message: `SERVER ERROR: ${error}`
  })
}

app.use('*', notFound);
app.use(handleServerError);

function start(port) {
  app.listen(port, () => console.log(`server is listening on ${port}`));
}

module.exports = {
  app: app,
  start: start
}
