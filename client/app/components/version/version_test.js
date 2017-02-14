'use strict';

describe('maplecroftApp.version module', function() {
  beforeEach(module('maplecroftApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
