'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAllDependenciesForProject = exports.getPackageJsonForDirectory = undefined;

var _path = require('path');

var _asyncFs = require('./async-fs');

var getPackageJsonForDirectory = exports.getPackageJsonForDirectory = async function getPackageJsonForDirectory(directory) {
	var path = (0, _path.resolve)(directory, 'package.json');

	return await (0, _asyncFs.readJsonFileAsync)(path);
};

var getAllDependenciesForProject = exports.getAllDependenciesForProject = async function getAllDependenciesForProject(cwd) {
	var packageJson = await getPackageJsonForDirectory(cwd);

	var runDeps = packageJson.dependencies || {};
	var devDeps = packageJson.devDependencies || {};

	return Object.assign({}, runDeps, devDeps);
};