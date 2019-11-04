/*

module: server.js
author: martin atkinson
date:   4 November 2019

*/

var express = require('express');

var config = require("./config.js");

var app = express();

app.get('/', doHomepage);

var server = app.listen(config.port);

function doHomepage(req, res, next) {
	
	res.writeHead(200, {'Content-Type': 'text/plain'});
   
	res.end('Welcome to the QF flights app.');
	
}

// log message that we're up and running
console.log('Server running on port %s', server.address().port);
