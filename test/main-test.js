var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var excel2Json = require('../src/main.js');
var helper = require('../src/helper.js');
describe('Excel_to_JSON', function() {
    it('excel2Json() should return Error if relative file URL is incorrect', function(done) {
        excel2Json('test/sample.xlsx', function(err, output) {
            expect(err).to.be.instanceof(Error);
            expect(output).to.be.undefined;
            done();
        });
    });
    it('excel2Json() should return Object and Have SheetNames if relative file URL is correct', function(done) {
        excel2Json('../test/sample.xls', function(err, output) {
            expect(err).to.equal(null);
            expect(output).to.be.instanceof(Object);
            expect(output).to.have.property("survey");
            expect(output).to.have.property("choices");
            done();
        });
    });

    it('excel2Json() should work with argument default Options', function(done) {
        excel2Json('../test/sample.xls', {
            'convert_all_sheet': true,
            'return_type': 'Object'
        }, function(err, output) {
            expect(err).to.equal(null);
            expect(output).to.be.instanceof(Object);
            expect(output).to.have.property("survey");
            expect(output.survey).to.be.instanceof(Array);
            expect(output.survey.length).to.equal(73);
            expect(output).to.have.property("choices");
            expect(output.choices).to.be.instanceof(Array);
            expect(output.choices.length).to.equal(70);
            done();
        });
    });
    it("excel2Json() should save file with argument Options 'convert_all_sheet': true,'return_type': 'File'", function(done) {
        excel2Json('../test/sample.xls', {
            'convert_all_sheet': true,
            'return_type': 'File'
        }, function(err, output) {
            expect(err).to.equal(null);
            expect(output.length).to.equal(2);
            expect(output[0].OutputFileName).to.be.a("string");
            expect(output[0].OutputFileName).to.equal("xlsx_2Json_SheetName_survey.json");
            var JSONFile0 = require("../"+output[0].OutputFileName);
            expect(JSONFile0).to.be.instanceof(Object);
            expect(JSONFile0).to.be.instanceof(Array);
            expect(JSONFile0.length).to.equal(73);
            expect(output[1].OutputFileName).to.be.a("string");
            expect(output[1].OutputFileName).to.equal("xlsx_2Json_SheetName_choices.json");
            var JSONFile1 = require("../"+output[1].OutputFileName);
            expect(JSONFile1).to.be.instanceof(Object);
            expect(JSONFile1).to.be.instanceof(Array);
            expect(JSONFile1.length).to.equal(70);
            done();
        });
    });
    it("excel2Json() should save file with argument Options 'convert_all_sheet': false,'return_type': 'File'", function(done) {
        excel2Json('../test/sample.xls', {
            'convert_all_sheet': false,
            'return_type': 'File',
            'sheetName': 'survey'
        }, function(err, output) {
            expect(err).to.equal(null);
            expect(output.length).to.equal(1);
            expect(output[0].OutputFileName).to.be.a("string");
            expect(output[0].OutputFileName).to.equal("xlsx_2Json_SheetName_survey.json");
            var JSONFile0 = require("../"+output[0].OutputFileName);
            expect(JSONFile0).to.be.instanceof(Object);
            expect(JSONFile0).to.be.instanceof(Array);
            expect(JSONFile0.length).to.equal(73);
            done();
        });
    });
    it("excel2Json() should save file with argument Options 'convert_all_sheet': false,'return_type': 'File'", function(done) {
        excel2Json('../test/sample.xls', {
            'convert_all_sheet': false,
            'return_type': 'Object',
            'sheetName': 'survey'
        }, function(err, output) {
            expect(err).to.equal(null);
            expect(output).to.be.instanceof(Array);
            expect(output.length).to.equal(73);
            done();
        });
    });
});
