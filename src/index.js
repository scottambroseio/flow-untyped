// @flow

import { resolve } from 'path';

import { fileExistsAsync, getFileAsync } from './async-fs';
import { getFlowTypeDefs, getFlowConfig, getPackageJsonForDirectory } from './io';

import type { PackageJson } from './types';

export const getAllDependenciesForProject = async (directory: string): Promise<Object> => {
  const packageJson: PackageJson = JSON.parse(
		await getFileAsync(resolve(directory, 'package.json')),
	);

  return Object.assign({}, packageJson.dependencies || {}, packageJson.devDependencies || {});
};

export const getInfo = async (cwd: string, projectDeps: Object) => {
  const flowTypeDefs = await getFlowTypeDefs(cwd);
  const flowConfig = await getFlowConfig(cwd);

  return Promise.all(
		Object.keys(projectDeps).map(async (dep) => {
  const path = resolve(cwd, `node_modules/${dep}`);

  const { main, version } = await getPackageJsonForDirectory(path);

			// if main file is index.js, look for index.js.flow
  const defFileExists = await fileExistsAsync(`${resolve(path, main || 'index.js')}.flow`);

  const depString = `${dep}@${version}`;

  if (defFileExists) {
    return `${depString} is typed`;
  }
			// check for flow-typed defFile in flow-typed directory
  const flowTypeDefExists = flowTypeDefs.some(filename => filename.match(`^${dep}_v`));

  if (flowTypeDefExists) {
    return `${depString} is typed`;
  }

  if (flowConfig.includes === undefined) {
    return `${depString} is untyped`;
  }

  Object.keys(flowConfig.includes).some(() => false);

  return `${depString} is untyped`;
}),
	);
};

export const run = async (): Promise<void> => {
  try {
    const cwd = process.cwd();

    const projectDeps = await getAllDependenciesForProject(cwd);

    const info = await getInfo(cwd, projectDeps);

    info.sort().forEach((result) => {
      console.log(result);
    });
  } catch (e) {
    console.error('Sorry, something went wrong :(');
  }
};
