var trak = require('../lib/trak-addy');

var expect = require('chai').expect;

describe('trak jobs', function(){
  describe('#list()', function(){
    it('should return some jobs', function(done){
     expect(trak.jobs.list(function(err){
        if (err) throw err;
        done();
      }));
    })
  })
})

describe('trak drivers', function(){
  describe('#list()', function(){
    it('should return some jobs', function(done){
     expect(trak.drivers.list(function(err){
        if (err) throw err;
        done();
      }));
    })
  })
})

describe('trak', function(){
  describe('#mapStatus()', function(){
    it('maps a jobs status code number to text', function(){
 	expect(trak.mapStatus(3)).to.be.a('string');
    })
  })
})
