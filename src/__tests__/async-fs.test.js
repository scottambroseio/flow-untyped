// @flow

import { readFile, access, readdir } from 'fs';

import { getFileAsync, fileExistsAsync, readDirAsync } from '../async-fs';

jest.mock('fs');

describe('getFileAsync', () => {
    const genMockFn = (arg1, arg2) => (
		path: string,
		encoding: string,
		callback: (err: any, data: any) => void,
	) => {
        callback(arg1, arg2);
    };

    it('should return the package.json contents as a JS object', async () => {
        const dir = 'testdir';
        const expected = "{ main: 'test' }";

        readFile.mockImplementation(genMockFn(undefined, expected));
		// $FlowFixMe
        await expect(getFileAsync(dir)).resolves.toEqual(expected);
    });

    it('should throw if it encounters an error when reading from the fs', async () => {
        const err = new Error('generic error');

        readFile.mockImplementation(genMockFn(err));
		// $FlowFixMe
        await expect(getFileAsync('test')).rejects.toBe(err);
    });
});

describe('readJsonFileAsync', () => {
    const genMockFn = err => (path: string, callback: (err: ?Error) => void) => {
        callback(err);
    };

    it('should return true if the file exists', async () => {
        access.mockImplementation(genMockFn());

        const result = await fileExistsAsync('somefile');

        expect(result).toBe(true);
    });

    it("should return false if the file doesn't exist", async () => {
        access.mockImplementation(genMockFn(new Error('dummy error')));

        const result = await fileExistsAsync('somefile');

        expect(result).toBe(false);
    });
});

describe('readDirAsync', () => {
    const genMockFn = (arg1, arg2) => (
		dir: string,
		callback: (err: ?Error, files: Array<string>) => void,
	) => {
        callback(arg1, arg2);
    };

    it('should return a list of files in the directory', async () => {
        const expected = ['somefile.js', 'someotherfile.js'];

        readdir.mockImplementation(genMockFn(undefined, expected));

        const result = await readDirAsync('testdir');

        expect(result).toBe(expected);
    });

    it('should return an empty list if the directory is empty', async () => {
        const expected = [];
        readdir.mockImplementation(genMockFn(new Error('some error'), []));

        const result = await readDirAsync('testdir');

        expect(result).toEqual(expected);
    });
});
