// @flow

import { readFile, access, readdir } from 'fs';

import { getFileAsync, fileExistsAsync, readDirAsync } from '../async-fs';

jest.mock('fs');

describe('getFileAsync', () => {
  it('should return the package.json contents as a JS object', async () => {
    const dir = 'testdir';
    const expected = `{
      main: 'test',
    }`;

    readFile.mockImplementation((path: string, encoding: string, callback: (
      err: any,
      data: any
    ) => void) => {
      callback(undefined, expected);
    });
    // $FlowFixMe
    await expect(getFileAsync(dir)).resolves.toEqual(expected);
  });

  it('should throw if it encounters an error when reading from the fs', async () => {
    const err = new Error('generic error');
    readFile.mockImplementation((path: string, encoding: string, callback: (
      err: any,
      data: any
    ) => void) => {
      callback(err, undefined);
    });
    // $FlowFixMe
    await expect(getFileAsync('test')).rejects.toBe(err);
  });
});

describe('readJsonFileAsync', () => {
  it('should return true if the file exists', async () => {
    access.mockImplementation((path: string, callback: (
      err: ?Error
    ) => void) => {
      callback();
    });

    const result = await fileExistsAsync('somefile');

    expect(result).toBe(true);
  });

  it("should return false if the file doesn't exist", async () => {
    access.mockImplementation((path: string, callback: (
      err: ?Error
    ) => void) => {
      callback(new Error('dummy error'));
    });

    const result = await fileExistsAsync('somefile');

    expect(result).toBe(false);
  });
});

describe('readDirAsync', () => {
  it('should return a list of files in the directory', async () => {
    const expected = ['somefile.js', 'someotherfile.js'];

    readdir.mockImplementation((dir: string, callback: (
      err: ?Error,
      files: Array<string>
    ) => void) => {
      callback(undefined, expected);
    });

    const result = await readDirAsync('testdir');

    expect(result).toBe(expected);
  });

  it('should return an empty list if the directory is empty', async () => {
    const expected = [];

    readdir.mockImplementation((dir: string, callback: (
      err: ?Error,
      files: Array<string>
    ) => void) => {
      callback(new Error('some error'), []);
    });

    const result = await readDirAsync('testdir');

    expect(result).toEqual(expected);
  });
});
