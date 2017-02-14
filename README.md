# geo-tweet-exercise

This is a rough AngularJS client and Django server that together display 10 tweets from twitter that can then be added to an interactive map.

## Pre-requisites

- linux
- python3
- Node

## Installation

### Server

1. cd into the server directory
1. run './install.sh'
1. populate the TWITTER_BEARER_TOKEN setting found at the top of 'server/assesment_site/assesment_site/settings.py'

### Client

1. Have Node installed
1. cd into the client directory
1. run 'npm install'

## Run the demo

1. run './start.sh' located in the same directory as this readme
2. point your browser at http://localhost:8000

## Caveats

- A modern linux like environment is assumed. So far it has only been tried on a Fedora 25 workstation.

- This exercise has been developed with Chrome with little to no testing in other browsers. Your mileage may vary.

- The solution is by no means considered exemplary but should hopefully demonstrate the ability of the author to leverage various tech.
