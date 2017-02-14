'use strict';

describe('maplecroftApp.countriesService', function() {
  beforeEach(module('maplecroftApp.countriesService'));

  describe('countries service', function() {
    beforeEach(inject(function(countriesService) {
      this.countries = countriesService;
    }));

    it('should make the entire list of countries available', function() {
      expect(this.countries.getList().length).toBeGreaterThan(0);
    });

    describe('each country in the list', function() {

      beforeEach(function() {
        this.country = this.countries.getList()[0];
      });

      it('should have a name', function() {
        expect(this.country.name).toMatch(/^\w+$/);
      });

      it('should have a two letter country code', function() {
        expect(this.country.code).toMatch(/^[A-Z]{2,2}$/);
      });

      it('should have a latitude', function() {
        expect(this.country.lat).toBeDefined();
      });

      it('should have a longitude', function() {
        expect(this.country.lat).toBeDefined();
      });
    });

    describe('provides a filter on country name', function() {
      it('should filter from the start of names', function() {
        var setCheck = this.countries.nameStartsWith('B');
        expect(setCheck.length).toBeGreaterThan(0);

        var filtered = this.countries.nameStartsWith('A');
        expect(filtered.length).toBeGreaterThan(0);

        for (var i = 0; i < filtered.length; i++ ) {
          expect(filtered[i].name[0]).toMatch(/^A/);
        }
      });

      it('should ignore case', function() {
        var filtered = this.countries.nameStartsWith('a');
        expect(filtered.length).toBeGreaterThan(0);

        for (var i = 0; i < filtered.length; i++ ) {
          expect(filtered[i].name[0]).toMatch(/^A/);
        }
      });

      it("should return an empty array when the filter doesn't match", function() {
        expect(this.countries.nameStartsWith('zz')).toEqual([]);
      });

    });

  });
});
