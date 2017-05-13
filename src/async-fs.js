// @flow

import { readFile, access, readdir } from 'fs';

export const getFileAsync = (path: string): Promise<string> =>
  new Promise((res, rej) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) return rej(err);

      return res(data);
    });
  });

export const fileExistsAsync = (path: string): Promise<boolean> =>
  new Promise((res) => {
    // $FlowFixMe
    access(path, (err: ?Error) => {
      if (err) return res(false);

      return res(true);
    });
  });

export const readDirAsync = (dir: string): Promise<Array<string>> =>
  new Promise((res) => {
    readdir(dir, (err: ?Error, files: Array<string>) => {
      if (err) return res([]);

      return res(files);
    });
  });
