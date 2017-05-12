// @flow

import { resolve } from 'path';
import { getAllDependenciesForProject } from '../io';

import { readJsonFileAsync } from '../async-fs';

jest.mock('../async-fs');
jest.mock('path');

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

  it('should invoke readJsonFileAsync with the correct arguments', async () => {
    const expected = 'foo/bar';

    resolve.mockImplementation(() => expected);

    await getAllDependenciesForProject('');

    expect(readJsonFileAsync).toBeCalledWith(expected);
  });

  it("should return empty objects if the fields don't exist", async () => {
    const expected = {};
    // $FlowFixMe
    readJsonFileAsync.mockImplementation(() => ({}));

    const result = await getAllDependenciesForProject('');

    expect(result).toEqual(expected);
  });
});
