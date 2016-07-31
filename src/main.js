var helper = require('./helper.js');
var fs = require('fs');
var async = require('async');

var options = {
    convert_all_sheet: true, //If this value is false, Then one sheet will processed which name would be provided
    return_type: 'File', //Two type of return type 'File' or 'Object'
    sheetName: '' //Only if convert_all_sheet=false
}

function excel2Json(fileName, options, callback) {
    if (typeof callback === 'undefined' && typeof options === 'function') {
        callback = options;
        options = {
            'convert_all_sheet': true,
            'return_type': 'Object'
        };
    }
    if (!fileName) {
        return callback(new Error("FileName undefiend or null"));
    }
    if (options.return_type == "File") {
        if (options.convert_all_sheet) {
            helper.convert(fileName, function(err, output) {
                if (err) {
                    return callback(err);
                }
                if (!output) {
                    return callback(new Error("Return by helper function convert is undefined or NUll"));
                }
                if (typeof output != 'object') {
                    return callback(new Error("Incorrect return by helper function"));
                }
                var FileSavedOutput = [];
                async.eachSeries(Object.keys(output), function(sheetname, cb) {
                    var excelOutPutFile = 'xlsx_2Json_SheetName_' + sheetname + '.json';
                    fs.writeFile(excelOutPutFile, JSON.stringify(output[sheetname]), function(err) {
                        if (err) {
                            return cb(err);
                        } else {
                            //console.log("JSON saved to " + excelOutPutFile);
                            FileSavedOutput.push({
                                OutputFileName: excelOutPutFile
                            })
                            return cb();
                        }
                    });
                }, function(err) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, FileSavedOutput);
                });

            });
        } else {
            if (typeof options.sheetName != 'string') {
                return callback(new Error("Sheetname can only be of data type String"))
            }
            helper.convert(fileName, function(err, output) {
                if (err) {
                    return callback(err);
                }
                if (!output) {
                    return callback(new Error("Return by helper function convert is undefined or NUll"));
                }
                if (typeof output != 'object') {
                    return callback(new Error("Incorrect return by helper function"));
                }
                var FileSavedOutput = [];
                var excelOutPutFile = 'xlsx_2Json_SheetName_' + options.sheetName + '.json';
                fs.writeFile(excelOutPutFile, JSON.stringify(output[options.sheetName]), function(err) {
                    if (err) {
                        FileSavedOutput.push({
                            OutputFileName: excelOutPutFile,
                            saved: false,
                            error: err
                        });
                    } else {
                        FileSavedOutput.push({
                            OutputFileName: excelOutPutFile,
                            saved: true
                        });
                    }
                    return callback(null, FileSavedOutput)
                });
            });
        }
    } else if (options.return_type == "Object") {
        if (options.convert_all_sheet) {
            helper.convert(fileName, function(err, output) {
                if (err) {
                    return callback(err);
                }
                if (!output) {
                    return callback(new Error("Return by helper function convert is undefined or NUll"));
                }
                if (typeof output != 'object') {
                    return callback(new Error("Incorrect return by helper function"));
                }
                return callback(null, output);
            });
        } else {
          if (typeof options.sheetName != 'string') {
              return callback(new Error("Sheetname can only be of data type String"))
          }
          helper.convert(fileName, function(err, output) {
              if (err) {
                  return callback(err);
              }
              if (!output) {
                  return callback(new Error("Return by helper function convert is undefined or NUll"));
              }
              if (typeof output != 'object') {
                  return callback(new Error("Incorrect return by helper function"));
              }
              return callback(null, output[options.sheetName])
          });
        }
    }
}
module.exports = excel2Json;
