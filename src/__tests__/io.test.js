// @flow

import { getAllDependenciesForProject } from '../io';

import { getFileAsync } from '../async-fs';

jest.mock('../async-fs');
jest.mock('path');

describe('getAllDependenciesForProject', () => {
  it('should return the correct dependencies', async () => {
    const expected = {
      foo: '1.0.0',
      bar: '1.0.0',
    };
    // $FlowFixMe
    getFileAsync.mockImplementation(
      () =>
        '{ "dependencies": { "foo": "1.0.0" }, "devDependencies": { "bar": "1.0.0" } }',
    );

    const result = await getAllDependenciesForProject('');

    expect(result).toEqual(expected);
  });

  it("should return empty objects if the fields don't exist", async () => {
    const expected = {};
    // $FlowFixMe
    getFileAsync.mockImplementation(() => '{}');

    const result = await getAllDependenciesForProject('');

    expect(result).toEqual(expected);
  });
});
