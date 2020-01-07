'use strict';
const http = require('http');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const dotenvStatus = require('dotenv').config();
const cors = require('cors');
const routes = require("./routes");
/* setting up the express app engine */
const app = express();
app.use(cors());

/* returns middleware that only parses urlencoded bodies */
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  
/* setting up the routes */
app.use(routes);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
});
/* making the public directory public */
let oneYear = 31536000; // seconds of one year
app.use(express.static('public',{ maxAge: oneYear }));

module.exports = app;