'use strict';

angular.module('maplecroftApp.version', [
  'maplecroftApp.version.interpolate-filter',
  'maplecroftApp.version.version-directive'
])

.value('version', '0.1');
