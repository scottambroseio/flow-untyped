// @flow

import { getPackageJsonForDirectory } from './io';

export const getAllDependenciesForProject = async (
	cwd: string,
): Promise<Object> => {
	const packageJson = await getPackageJsonForDirectory(cwd);

	const runDeps = packageJson.dependencies || {};
	const devDeps = packageJson.devDependencies || {};

	return Object.assign({}, runDeps, devDeps);
};