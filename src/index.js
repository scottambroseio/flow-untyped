// @flow

'use strict';

import { resolve } from 'path';

import { fileExistsAsync, readDirAsync, readJsonFileAsync } from './async-fs';
import { getAllDependenciesForProject } from './io';

export const getInfo = async (cwd: string, projectDeps: Object) => {
	const flowTypedDir = resolve(cwd, 'flow-typed/npm');
	const flowTypeDefs = await readDirAsync(flowTypedDir);

	return Promise.all(Object.keys(projectDeps).map(async (dep) => {
		const path = resolve(cwd, `node_modules/${dep}`);
		const packageJsonPath = resolve(path, 'package.json');
		const { main, version } = await readJsonFileAsync(packageJsonPath);
		const mainFile = resolve(path, main || 'index.js');

		// if main file is index.js, look for index.js.flow
		const defFile = mainFile + '.flow';
		const defFileExists = await fileExistsAsync(defFile);
		const depString = `${dep}@${version}`

		if (defFileExists) {
			return `${depString} is typed`;
		} else {
			// check for flow-typed defFile in flow-typed directory
			const flowTypeDefExists = flowTypeDefs.some(filename => {
				return filename.match(`^${dep}_v`);
			});

			return flowTypeDefExists ? `${depString} is typed` : `${depString} is untyped`;
		}
	}));
};

export const run = async (): Promise<string[]> => {
	const cwd = process.cwd();
	
	const projectDeps = await getAllDependenciesForProject(cwd);

	return await getInfo(cwd, projectDeps);
};
