'use strict';

function TweetsService($http, endpoint) {
  function getTweets(success, failure) {
    return $http({
      method: 'GET',
      url: endpoint
    });
  }

  return {
    get: getTweets
  };

}

angular.module('maplecroftApp.tweetsService', [])
  .service('tweetsService', ['$http', 'tweetsServiceEndpoint', TweetsService]);
