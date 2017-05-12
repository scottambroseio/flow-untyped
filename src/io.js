// @flow

import { resolve } from 'path';

import { readJsonFileAsync } from './async-fs';

// eslint-disable-next-line
export const getAllDependenciesForProject = async (
  directory: string,
): Promise<Object> => {
  const path = resolve(directory, 'package.json');
  const packageJson = await readJsonFileAsync(path);

  const runDeps = packageJson.dependencies || {};
  const devDeps = packageJson.devDependencies || {};

  return Object.assign({}, runDeps, devDeps);
};
