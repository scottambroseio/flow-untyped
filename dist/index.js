'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.run = exports.getInfo = undefined;

var _path = require('path');

var _asyncFs = require('./async-fs');

var _io = require('./io');

var TYPED = 'typed';
var UNTYPED = 'untyped';

var getInfo = exports.getInfo = async function getInfo(cwd, projectDeps) {
	var flowTypedDir = (0, _path.resolve)(cwd, 'flow-typed/npm');
	var flowTypeDefs = await (0, _asyncFs.readDirAsync)(flowTypedDir);

	return Promise.all(Object.keys(projectDeps).map(async function (dep, index) {
		var path = (0, _path.resolve)(cwd, 'node_modules/' + dep);

		var _ref = await (0, _io.getPackageJsonForDirectory)(path),
		    main = _ref.main;

		var mainFile = (0, _path.resolve)(path, main || 'index.js');

		// if main file is index.js, look for index.js.flow
		var defFile = mainFile + '.flow';
		var defFileExists = await (0, _asyncFs.fileExistsAsync)(defFile);

		if (defFileExists) {
			return dep + ' is typed';
		} else {
			// check for flow-typed defFile in flow-typed directory
			var flowTypeDefExists = flowTypeDefs.some(function (filename) {
				return filename.match('^' + dep + '_v');
			});

			return flowTypeDefExists ? dep + ' is typed' : dep + ' is untyped';
		}
	}));
};

var run = exports.run = async function run() {
	var cwd = process.cwd();

	var projectDeps = await (0, _io.getAllDependenciesForProject)(cwd);

	return await getInfo(cwd, projectDeps);
};