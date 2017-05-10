// @flow

import { resolve } from 'path';

import { readJsonFileAsync } from './utils';

export const getPackageJsonForDirectory = async (directory: string): Promise<Object> => {
    const path = resolve(directory, 'package.json');

    return await readJsonFileAsync(path);
};
