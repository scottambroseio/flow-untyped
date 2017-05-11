// @flow

'use strict';

import slash from 'slash';
import {
	getPackageJsonForDirectory,
	getAllDependenciesForProject,
} from '../io';

import { readJsonFileAsync } from '../async-fs';

jest.mock('../async-fs');

describe('getPackageJsonForDirectory', () => {
	it('should invoke readJsonFileAsync with the correct arguments and return the result', async () => {
		const expectedReturn = { test: true };
		// $FlowFixMe
		readJsonFileAsync.mockImplementation(() => expectedReturn);

		const dir = 'test';

		const result = await getPackageJsonForDirectory(dir);
		// $FlowFixMe
		const calledWith = slash(readJsonFileAsync.mock.calls[0][0]);

		expect(result).toBe(expectedReturn);
		expect(calledWith).toMatch(/test\/package.json$/);
	});
});

describe('getAllDependenciesForProject', () => {
	it('should return the correct dependencies', async () => {
		const expected = {
			foo: '1.0.0',
			bar: '1.0.0',
		};
		// $FlowFixMe
		readJsonFileAsync.mockImplementation(() => ({
			dependencies: { foo: '1.0.0' },
			devDependencies: { bar: '1.0.0' },
		}));

		const result = await getAllDependenciesForProject('');

		expect(result).toEqual(expected);
	});

	it("should return empty objects if the fields don't exist", async () => {
		const expected = {};
		// $FlowFixMe
		readJsonFileAsync.mockImplementation(() => ({}));

		const result = await getAllDependenciesForProject('');

		expect(result).toEqual(expected);
	});
});
