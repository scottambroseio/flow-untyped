// @flow

import { resolve } from 'path';
import slash from 'slash';

import { getPackageJsonForDirectory } from '../index';
import { readJsonFileAsync } from '../utils';

jest.mock('../utils')

describe('getPackageJsonForDirectory', () => {
    it('should return the package.json contents as a JS object', async () => {
        const expected = {
            foo: 'foo'
        };

        readJsonFileAsync.mockImplementation(async () => {
            return Promise.resolve(expected);
        });

        const result = await getPackageJsonForDirectory('testdir');
        const calledWith = slash(readJsonFileAsync.mock.calls[0][0]);
        const expectedCalledWith = `${slash(process.cwd())}/testdir/package.json`;

        expect(calledWith).toMatch(new RegExp(expectedCalledWith));
        expect(result).toBe(expected);
    });
});
