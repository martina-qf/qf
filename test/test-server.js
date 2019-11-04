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