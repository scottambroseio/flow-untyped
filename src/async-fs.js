// @flow

'use strict';

import { readFile, access, readdir } from 'fs';

export const readJsonFileAsync = (path: string): Promise<Object> => {
	return new Promise((res, rej) => {
		readFile(path, 'utf8', function(err, data) {
			if (err) return rej(err);

			return res(JSON.parse(data));
		});
	});
};

export const fileExistsAsync = (path: string): Promise<boolean> => {
	return new Promise((res, rej) => {
		// $FlowFixMe
		access(path, (err: ?ErrnoError) => {
			if (err) return res(false);

			return res(true);
		});
	});
};

export const readDirAsync = (dir: string): Promise<Array<string>> => {
	return new Promise((res, rej) => {
		readdir(dir, (err: ?ErrnoError, files: Array<string>) => {
			if (err) return res([]);

			return res(files);
		});
	});
};
