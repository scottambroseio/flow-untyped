// @flow
import { readFile } from 'fs';

import { readJsonFileAsync } from '../utils';

jest.mock('fs');

describe('readJsonFileAsync', () => {
    it('should return the package.json contents as a JS object', async () => {
        const dir = 'testdir';
        const expected = {
            main: 'test'
        };

        readFile.mockImplementation((path: string, encoding: string, callback: (err: any, data: any) => void) => {
            callback(undefined, `{
                "main": "test"
            }`);
        });

        const result = await readJsonFileAsync(dir);

        expect(readFile).toHaveBeenCalledWith(expect.any(String), 'utf8', expect.any(Function));
        expect(result).toEqual(expected);
    })
})
