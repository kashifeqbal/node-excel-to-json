var chai = require('chai');
var expect = chai.expect;
var helper = require('../src/helper.js');
describe('Helper Function', function() {
    it('read() should return Error if relative file URL is incorrect', function() {
        expect(helper.read('../test/sample.xlsx')).to.be.instanceof(Error);
    });
    it('read() should return Object if relative file URL is correct', function() {
        var workbook = helper.read('../test/sample.xls');
        expect(workbook).to.not.be.instanceof(Error);
        expect(workbook).to.be.instanceof(Object);
        expect(workbook.SheetNames).to.be.instanceof(Array);
        expect(workbook.SheetNames[0]).to.equal('survey');
        expect(workbook.SheetNames[1]).to.equal('choices');
    });
    it('convert() should return Error if relative file URL is incorrect', function(done) {
        helper.convert('../test/sample.xlsx', function(err, output){
          expect(err).to.be.instanceof(Error);
          expect(output).to.be.undefined;
          done();
        });
    });
    it('convert() should return Object and Have SheetNames if relative file URL is correct', function(done) {
        helper.convert('../test/sample.xls', function(err, output){
          expect(err).to.equal(null);
          expect(output).to.be.instanceof(Object);
          expect(output).to.have.property("survey");
          expect(output).to.have.property("choices");
          done();
        });
    });
});
