// @flow

import { resolve } from 'path';

import { getFileAsync } from './async-fs';

// eslint-disable-next-line
export const getAllDependenciesForProject = async (
  directory: string,
): Promise<Object> => {
  const path = resolve(directory, 'package.json');

  const packageJson = JSON.parse(await getFileAsync(path));

  const runDeps = packageJson.dependencies || {};
  const devDeps = packageJson.devDependencies || {};

  return Object.assign({}, runDeps, devDeps);
};
