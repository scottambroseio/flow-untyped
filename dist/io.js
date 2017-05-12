'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllDependenciesForProject = undefined;

var _path = require('path');

var _asyncFs = require('./async-fs');

// eslint-disable-next-line
var getAllDependenciesForProject = exports.getAllDependenciesForProject = async function getAllDependenciesForProject(directory) {
  var path = (0, _path.resolve)(directory, 'package.json');
  var packageJson = await (0, _asyncFs.readJsonFileAsync)(path);

  var runDeps = packageJson.dependencies || {};
  var devDeps = packageJson.devDependencies || {};

  return Object.assign({}, runDeps, devDeps);
};
//# sourceMappingURL=io.js.map