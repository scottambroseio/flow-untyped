// @flow

'use strict';

import { resolve } from 'path';

import { readJsonFileAsync, fileExistsAsync, readDirAsync } from './async-fs';
import { getAllDependenciesForProject, getPackageJsonForDirectory } from './io';

const TYPED = 'typed';
const UNTYPED = 'untyped';

export const run = async () => {
	const cwd = process.cwd();
	const projectDeps = await getAllDependenciesForProject(cwd);

	const flowTypedDir = resolve(cwd, 'flow-typed/npm');
	const flowTypeDefs = await readDirAsync(flowTypedDir);

	const promises = Object.keys(projectDeps).map(async (dep, index) => {
		const path = resolve(cwd, `node_modules/${dep}`);
		const packageJson = await getPackageJsonForDirectory(path);
		const mainFile = resolve(path, packageJson.main || 'index.js');

		// if main file is index.js, look for index.js.flow
		const defFile = mainFile + '.flow';
		const defFileExists = await fileExistsAsync(defFile);

		if (defFileExists) {
			return { [dep]: TYPED };
		} else {
			// check for flow-typed defFile in flow-typed directory
			const flowTypeDefExists = flowTypeDefs.some(filename => {
				return filename.match(`^${dep}_v`);
			});

			if (flowTypeDefExists) {
				return { [dep]: TYPED };
			} else {
				return { [dep]: UNTYPED };
			}
		}
	});

	const results = await Promise.all(promises);

	const summary = Object.assign({}, ...results);

	return summary;
};
