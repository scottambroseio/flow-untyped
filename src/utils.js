// @flow

import { readFile } from 'fs';

export const readJsonFileAsync = (path: string): Promise<Object> => {
    return new Promise((res, rej) => {
        readFile(path, 'utf8', function (err, data) {
            if (err)
               return rej(err)

            return res(JSON.parse(data));
        });
    });
}
