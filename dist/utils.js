'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getAllDependenciesForProject = undefined;

var _io = require('./io');

var getAllDependenciesForProject = exports.getAllDependenciesForProject = async function getAllDependenciesForProject(cwd) {
	var packageJson = await (0, _io.getPackageJsonForDirectory)(cwd);

	var runDeps = packageJson.dependencies || {};
	var devDeps = packageJson.devDependencies || {};

	return Object.assign({}, runDeps, devDeps);
};