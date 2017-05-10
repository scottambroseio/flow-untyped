// @flow
import { readFile, access } from 'fs';

import { readJsonFileAsync, fileExistsAsync } from '../utils';

jest.mock('fs');

describe('readJsonFileAsync', () => {
	it('should return the package.json contents as a JS object', async () => {
		const dir = 'testdir';
		const expected = {
			main: 'test',
		};

		readFile.mockImplementation(
			(
				path: string,
				encoding: string,
				callback: (err: any, data: any) => void,
			) => {
				callback(
					undefined,
					`{
                "main": "test"
            }`,
				);
			},
		);

		const result = await readJsonFileAsync(dir);

		expect(readFile).toHaveBeenCalledWith(
			expect.any(String),
			'utf8',
			expect.any(Function),
		);
		expect(result).toEqual(expected);
	});

	it('should throw if it encounters an error when reading from the fs', async () => {
		const err = new Error('generic error');

		readFile.mockImplementation(
			(
				path: string,
				encoding: string,
				callback: (err: any, data: any) => void,
			) => {
				callback(err, undefined);
			},
		);

		// $FlowFixMe
		await expect(readJsonFileAsync('test')).rejects.toBe(err);
	});
});

describe('readJsonFileAsync', () => {
	it('should return true if the file exists', async () => {
		access.mockImplementation(
			(path: string, callback: (err: ?ErrnoError) => Promise<boolean>) => {
				callback();
			},
		);

		const result = await fileExistsAsync('somefile');

		expect(result).toBe(true);
	});

	it("should return false if the file doesn't exist", async () => {
		access.mockImplementation(
			(path: string, callback: (err: ?ErrnoError) => Promise<boolean>) => {
				callback(new Error('dummy error'));
			},
		);

		const result = await fileExistsAsync('somefile');

		expect(result).toBe(false);
	});
});
