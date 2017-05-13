// @flow

import { resolve } from 'path';
import { parse } from 'ini';

import { getFileAsync, readDirAsync } from './async-fs';

import type { FlowConfig, PackageJson } from './types';

export const getFlowConfig = async (cwd: string): Promise<FlowConfig> => {
    const path = resolve(cwd, '.flowconfig');
    const file = await getFileAsync(path);

    return parse(file);
};

export const getFlowTypeDefs = (cwd: string): Promise<string[]> => {
    const path = resolve(cwd, 'flow-typed/npm');

    return readDirAsync(path);
};

export const getPackageJsonForDirectory = async (path: string): Promise<PackageJson> => {
    const jsonPath = resolve(path, 'package.json');
    const file = await getFileAsync(jsonPath);

    return JSON.parse(file);
};
