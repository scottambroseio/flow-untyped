// @flow

import { resolve } from 'path';

import { readJsonFileAsync } from './async-fs';

export const getPackageJsonForDirectory = async (
	directory: string,
): Promise<Object> => {
	const path = resolve(directory, 'package.json');

	return await readJsonFileAsync(path);
};

export const getAllDependenciesForProject = async (
	cwd: string,
): Promise<Object> => {
	const packageJson = await getPackageJsonForDirectory(cwd);

	const runDeps = packageJson.dependencies || {};
	const devDeps = packageJson.devDependencies || {};

	return Object.assign({}, runDeps, devDeps);
};
