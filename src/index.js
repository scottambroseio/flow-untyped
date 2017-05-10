// @flow

import { resolve } from 'path';

import { readJsonFileAsync, fileExistsAsync, readDirAsync } from './async-fs';
import { getAllDependenciesForProject, getPackageJsonForDirectory } from './io';

export const run = async () => {
	const cwd = process.cwd();
	const deps = await getAllDependenciesForProject(cwd);

	const dirToCheck = resolve(cwd, 'flow-typed/npm');
	const typedFiles = await readDirAsync(dirToCheck);

	const promises = Object.keys(deps).map(async (dep, index) => {
		const path = resolve(cwd, `node_modules/${dep}`);
		const packageJson = await getPackageJsonForDirectory(path);
		const mainFile = resolve(path, packageJson.main || 'index.js');

		//search for .js.flow
		const defFile = mainFile + '.flow';
		const defFileExists = await fileExistsAsync(defFile);

		if (defFileExists) {
			return { [dep]: 'typed' };
		} else {
			// check for flow typed defFile
			const typedFileExists = typedFiles.some(filename => {
				return filename.match(`^${dep}_v`);
			});

			if (typedFileExists) {
				return { [dep]: 'typed' };
			} else {
				return { [dep]: 'untyped' };
			}
		}
	});

	const results = await Promise.all(promises);

	const summary = Object.assign({}, ...results);

	return summary;

	return {};
};
