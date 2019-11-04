/*

module: server.js
author: martin atkinson
date:   4 November 2019

*/

var express = require('express');
var bodyParser = require('body-parser');

var config = require("./config.js");

var app = express();

app.use(bodyParser.json());

app.use(errorHandler);

app.get('/', doHomepage);
app.post('/flights', doFlights);

var server = app.listen(config.port);

// serve a basic home page
function doHomepage(req, res, next) {
	
	res.writeHead(200, {'Content-Type': 'text/plain'});
   
	res.end('Welcome to the flights app.');
	
}

// flights api
function doFlights(req, res, next) {
    	
	console.log("received a post request %s", req.body);
	
	// catch invalid or empty json request
	if (typeof req.body.flights === 'undefined') {
		console.log("no flights received");
		res.status(400); // bad request
		res.set('Content-Type', 'application/json');
		res.send('{"error": "Error parsing JSON"}');
		return;
	}
	
    res.send(req.body);
	
}

// catch error json
function errorHandler (err, req, res, next) {
  res.status(400); // bad request
  res.set('Content-Type', 'application/json');
  res.send('{"error": "Error parsing JSON"}');
}
		
// log message that we're up and running
console.log('Server running on port %s', server.address().port);
