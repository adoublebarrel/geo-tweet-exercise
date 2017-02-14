'use strict';


describe('maplecroftApp.tweetsService module', function() {
  beforeEach(module('maplecroftApp.tweetsService'));

  describe('tweets service', function() {
    var fakeEndpoint = 'https://fake-api.com';
    var tweetsService;
    var httpBackend;

    beforeEach(function() {
      module(function($provide) {
        $provide.value('tweetsServiceEndpoint', fakeEndpoint);
      });

      inject(function(_tweetsService_, $httpBackend, tweetsServiceEndpoint) {
        tweetsService = _tweetsService_;
        httpBackend = $httpBackend;
      });


    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });


    it('should return the tweets from the server', function() {
      var dumbText = "The service dumbly passes the response from the server";

      httpBackend.when('GET', fakeEndpoint).respond(
        [
          {"dumb": "The service dumbly passes the response from the server"},
        ]
      );

      tweetsService.get().then(function(tweets) {
        expect(tweets.data.length).toEqual(1);
        expect(tweets.data[0].dumb).toEqual(dumbText);
      });

      httpBackend.flush();
    });
  });
});
