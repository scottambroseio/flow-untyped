'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readDirAsync = exports.fileExistsAsync = exports.readJsonFileAsync = undefined;

var _fs = require('fs');

var readJsonFileAsync = exports.readJsonFileAsync = function readJsonFileAsync(path) {
  return new Promise(function (res, rej) {
    (0, _fs.readFile)(path, 'utf8', function (err, data) {
      if (err) return rej(err);

      return res(JSON.parse(data));
    });
  });
};

var fileExistsAsync = exports.fileExistsAsync = function fileExistsAsync(path) {
  return new Promise(function (res) {
    // $FlowFixMe
    (0, _fs.access)(path, function (err) {
      if (err) return res(false);

      return res(true);
    });
  });
};

var readDirAsync = exports.readDirAsync = function readDirAsync(dir) {
  return new Promise(function (res) {
    (0, _fs.readdir)(dir, function (err, files) {
      if (err) return res([]);

      return res(files);
    });
  });
};