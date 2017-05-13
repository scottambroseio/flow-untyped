// @flow

import { resolve } from 'path';

import { fileExistsAsync, getFileAsync } from './async-fs';
import { getFlowTypeDefs, getFlowConfig, getPackageJsonForDirectory } from './io';

import type { PackageJson, FlowConfig } from './types';

export const getAllDependenciesForProject = async (directory: string): Promise<Object> => {
    const path = resolve(directory, 'package.json');
    const file = await getFileAsync(path);
    const packageJson: PackageJson = JSON.parse(file);

    return Object.assign({}, packageJson.dependencies || {}, packageJson.devDependencies || {});
};

const resolveIsTyped = async (
	cwd: string,
	dep: string,
	flowTypeDefs: string[],
	flowConfig: FlowConfig,
): Promise<string> => {
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

	// todo: build this
    Object.keys(flowConfig.includes).some(() => false);

    return `${depString} is untyped`;
};

export const getIsTyped = async (cwd: string, projectDeps: Object): Promise<string[]> => {
    const flowTypeDefs = await getFlowTypeDefs(cwd);
    const flowConfig = await getFlowConfig(cwd);

    return Promise.all(
		Object.keys(projectDeps).map(dep => resolveIsTyped(cwd, dep, flowTypeDefs, flowConfig)),
	);
};

export const run = async (): Promise<void> => {
    try {
        const cwd = process.cwd();
        const projectDeps = await getAllDependenciesForProject(cwd);
        const info = await getIsTyped(cwd, projectDeps);

        info.sort().forEach((result) => {
            console.log(result);
        });
    } catch (e) {
        console.error('Sorry, something went wrong :(');
    }
};
