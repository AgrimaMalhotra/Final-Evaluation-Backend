const updateJsonKey = require('../../src/utils/updateJsonKey.util');

describe('updateJsonKey', () => {
  it('should update the key in the JSON object and delete the old key', () => {
    const json = { name: 'John', age: 30 };
    const body = { update: 'name', updateWith: 'firstName' };
    const expectedOutput = { firstName: 'John', age: 30 };

    const result = updateJsonKey(json, body);

    expect(result).toEqual(expectedOutput);
  });

  it('should not modify the JSON object if the update key is not present', () => {
    const json = { name: 'John', age: 30 };
    const body = { update: 'firstName', updateWith: 'lastName' };
    const expectedOutput = { name: 'John', age: 30 };

    const result = updateJsonKey(json, body);

    expect(result).toEqual(expectedOutput);
  });
});
