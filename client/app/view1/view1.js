'use strict';

angular.module('maplecroftApp.view1', ['ngRoute', 'maplecroftApp.tweetsService', 'maplecroftApp.countriesService', 'tiny-leaflet-directive', 'angucomplete-alt'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])
  .controller('View1Ctrl', ['$scope', 'tweetsService', 'countriesService', 'tldMapService', function($scope, tweetsService, countriesService,  tldMapService) {
    // TODO: split this functionality into tweets list, map and country search
    // This controller would then act as a mediator between those three components

    // Setup custom map markers
    var twitterMarker = L.AwesomeMarkers.icon({
      icon: 'ion-social-twitter',
      markerColor: 'blue'
    });

    var greyTwitterMarker = L.AwesomeMarkers.icon({
      icon: 'ion-social-twitter',
      markerColor: 'cadetblue'
    });

    L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';
    // End Custom Map Markers

    var selectedTweet = null;

    // Retrieve Tweets
    tweetsService.get().then(function(response) {
      $scope.tweets = response.data.slice(0,10);
    });

    // Retrieve Countries
    $scope.countries = countriesService.getList();
    $scope.countriesDialogClass = 'invisible';

    // Config for tiny-leaflet-directive
    $scope.mapOptions = {
      center: [20,0],
      zoom: 1.5,
      layers: [L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })]
    };

    // Get ready to pin a Tweet to the map
    $scope.pinTweet = function($event, tweet) {
      tldMapService.getMap('map').then(function(map) {
        map.once('click', function(event) {
          placeMarker(tweet, map, event.latlng);
        });
      });
    };

    // Select a tweet
    $scope.selectTweet = function(tweet) {
      if (selectedTweet && selectedTweet.marker) {
        selectedTweet.marker.setIcon(greyTwitterMarker);
      }

      if (tweet.marker) {
        tweet.marker.setIcon(twitterMarker);
        tweet.marker.openPopup();
      }

      selectedTweet = tweet;
    };

    // Display Search Countries dialog
    $scope.searchCountries = function($event, tweet) {
      $scope.countriesDialogClass = '';
    };

    // Add/update the tweets marker to the selected country
    $scope.addMarkerToCountry = function(country) {
      if (!country) {
        return;
      }

      var latlng = {
        lat: country.originalObject.lat,
        lng: country.originalObject.lng
      };

      tldMapService.getMap('map').then(function(map) {
        placeMarker(selectedTweet, map, latlng);

        $scope.countriesDialogClass = 'invisible';
        $scope.$broadcast('angucomplete-alt:clearInput');
      });
    };

    $scope.tweetClasses = function(tweet) {
      if (selectedTweet && tweet.id_str === selectedTweet.id_str) {
        return "tweet selected";
      }

      return "tweet";
    };

    // Use leaflet directly to create a marker
    function createMarker(tweet, latlng) {
      var marker =  L.marker(latlng, {
        icon: twitterMarker,
        draggable: true,
        riseOnHover: true,
        title: tweet.text,
        alt: tweet.text
      });

      return marker;
    }

    // Place a marker on the map
    function placeMarker(tweet, map, latlng) {
      if (tweet.marker) {
        tweet.marker.setLatLng(latlng);
      } else {
        tweet.marker = createMarker(tweet, latlng);
        tweet.marker.addTo(map);
        tweet.marker.bindPopup(tweet.text).openPopup();
        tweet.marker.on('click', selectTweetViaMap.bind(this, tweet.id_str));
      }

    }

    // Sync the angular template with map selection state
    function selectTweetViaMap(tweetIdStr) {
      for (var t of $scope.tweets) {
        if (t.id_str === tweetIdStr) {
          $scope.selectTweet(t);
        }
      }

      $scope.$digest();
    }

  }]);
