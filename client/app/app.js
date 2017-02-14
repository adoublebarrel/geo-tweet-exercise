'use strict';

// Declare app level module which depends on views, and components
angular.module('maplecroftApp', [
  'ngRoute',
  'maplecroftApp.view1'
])
  .value('tweetsServiceEndpoint', "http://localhost:8080/geo-tweets/")
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
