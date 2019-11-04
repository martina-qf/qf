/*

module: test-server.js
author: martin atkinson
date:   4 November 2019

*/

var expect  = require('chai').expect;
var request = require('request');

var home_url = "http://localhost:8080/";

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
