import ErrorSubclass from '../src/ErrorSubclass';

const ERROR_MESSAGE = '__MESSAGE__';

class SubSubError extends ErrorSubclass {
  static displayName = 'SubSubErrorDisplayName';
}

const {captureStackTrace} = Error;

afterEach(() => {
  Error.captureStackTrace = captureStackTrace;
});

test('Subclass of ErrorSubclass can be instantiated', () => {
  expect(() => new SubSubError(ERROR_MESSAGE)).not.toThrow();
});

test('SubSubclass instance should be instanceof Error', () => {
  const instance = new SubSubError(ERROR_MESSAGE);
  expect(instance).toBeInstanceOf(Error);
  expect(instance).toBeInstanceOf(SubSubError);
});

test('SubSubclass instance should have a name that matches the displayName', () => {
  const instance = new SubSubError(ERROR_MESSAGE);
  expect(instance.name).toBe('SubSubErrorDisplayName');
});

test('SubSubclass instance should have a message', () => {
  const instance = new SubSubError(ERROR_MESSAGE);
  expect(instance.message).toBe(ERROR_MESSAGE);
});

test('SubSubclass instance has a toString() method', () => {
  const instance = new SubSubError(ERROR_MESSAGE);
  expect(typeof instance.toString).toBe('function');
  expect(instance.toString()).toBe(`SubSubErrorDisplayName: ${ERROR_MESSAGE}`);
});

test('SubSubclass instance when captureStackTrace is supported, should have a stack', () => {
  expect(typeof Error.captureStackTrace).toBe('function');
  const instance = new SubSubError(ERROR_MESSAGE);
  expect(typeof instance.stack).toBe('string');
  expect(instance.stack).toMatch(`SubSubErrorDisplayName: ${ERROR_MESSAGE}`);
});

test('SubSubclass, when captureStackTrace is not supported, should still have a stack', () => {
  Reflect.deleteProperty(Error, 'captureStackTrace');
  expect(Error.captureStackTrace).not.toBeDefined();
  const instance = new SubSubError(ERROR_MESSAGE);
  expect(typeof instance.stack).toBe('string');
});
