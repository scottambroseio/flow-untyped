// @flow

import { resolve } from 'path';
import { parse } from 'ini';

import { getFileAsync, readDirAsync } from './async-fs';

import type { FlowConfig, PackageJson } from './types';

export const getFlowConfig = async (cwd: string): Promise<FlowConfig> =>
	parse(await getFileAsync(resolve(cwd, '.flowconfig')));

export const getFlowTypeDefs = (cwd: string): Promise<string[]> =>
	readDirAsync(resolve(cwd, 'flow-typed/npm'));

export const getPackageJsonForDirectory = async (path: string): Promise<PackageJson> =>
	JSON.parse(await getFileAsync(resolve(path, 'package.json')));
