/*

module: test-server.js
author: martin atkinson
date:   4 November 2019

*/


var expect  = require('chai').expect;
var request = require('request');
var fs = require('fs');

var home_url = "http://localhost:8080/";
var api_url = home_url + "flights"; 

describe('Home page', function() {
    it('status', function(done){
        request(home_url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('content', function(done) {
        request(home_url , function(error, response, body) {
            expect(body).to.equal('Welcome to the flights app.');
            done();
        });
    });
});

describe('Flights bad JSON', function() {
    it('empty json', function(done) {
		request.post({
			headers: {'content-type' : 'application/json'},
			url:     api_url,
			body:    "{}"
		}, function(error, response, body) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });
    it('invalid json', function(done) {
		request.post({
			headers: {'content-type' : 'application/json'},
			url:     api_url,
			body:    'foo'
		}, function(error, response, body) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });	
});

// read the JSON test data from the file system
var test1_JSON = fs.readFileSync(__dirname + '\\test1.JSON', 'utf8');
var test2_JSON = fs.readFileSync(__dirname + '\\test2.JSON', 'utf8');
var test3_JSON = fs.readFileSync(__dirname + '\\test3.JSON', 'utf8');


describe('SYD QF flights', function() {
    it('SYD QF arrival', function(done) {
		request.post({
			headers: {'content-type' : 'application/json'},
			url:     api_url,
			body:    test1_JSON
		}, function(error, response, body) {
			//console.log(body);
            expect(response.statusCode).to.equal(200);
			expect(body).to.equal('{"flights":[{"flight":"QF001 BNE","destination":"SYD","departureTime":"05/11/2019 22:00"}]}');
            done();
        });
    });
    it('SYD QF departure', function(done) {
		request.post({
			headers: {'content-type' : 'application/json'},
			url:     api_url,
			body:    test2_JSON
		}, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('{"flights":[{"flight":"QF002 SYD","destination":"PER","departureTime":"06/11/2019 14:00"}]}');
            done();
        });
    });
    it('SYD QF combined', function(done) {
		request.post({
			headers: {'content-type' : 'application/json'},
			url:     api_url,
			body:    test3_JSON
		}, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('{"flights":[{"flight":"QF001 BNE","destination":"SYD","departureTime":"05/11/2019 22:00"},{"flight":"QF002 SYD","destination":"PER","departureTime":"06/11/2019 14:00"}]}');
            done();
        });
    });	
});


