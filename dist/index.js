'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.run = undefined;

var _path = require('path');

var _asyncFs = require('./async-fs');

var _io = require('./io');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TYPED = 'typed';
var UNTYPED = 'untyped';

var run = exports.run = async function run() {
	var cwd = process.cwd();
	var projectDeps = await (0, _io.getAllDependenciesForProject)(cwd);

	var flowTypedDir = (0, _path.resolve)(cwd, 'flow-typed/npm');
	var flowTypeDefs = await (0, _asyncFs.readDirAsync)(flowTypedDir);

	var promises = Object.keys(projectDeps).map(async function (dep, index) {
		var path = (0, _path.resolve)(cwd, 'node_modules/' + dep);
		var packageJson = await (0, _io.getPackageJsonForDirectory)(path);
		var mainFile = (0, _path.resolve)(path, packageJson.main || 'index.js');

		// if main file is index.js, look for index.js.flow
		var defFile = mainFile + '.flow';
		var defFileExists = await (0, _asyncFs.fileExistsAsync)(defFile);

		if (defFileExists) {
			return _defineProperty({}, dep, TYPED);
		} else {
			// check for flow-typed defFile in flow-typed directory
			var flowTypeDefExists = flowTypeDefs.some(function (filename) {
				return filename.match('^' + dep + '_v');
			});

			if (flowTypeDefExists) {
				return _defineProperty({}, dep, TYPED);
			} else {
				return _defineProperty({}, dep, UNTYPED);
			}
		}
	});

	var results = await Promise.all(promises);

	var summary = Object.assign.apply(Object, [{}].concat(_toConsumableArray(results)));

	return summary;
};