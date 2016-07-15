import ErrorSubclass from '../src/ErrorSubclass';
import { ok, equal, doesNotThrow } from 'assert';

const ERROR_MESSAGE = '__MESSAGE__';

class SubSubError extends ErrorSubclass {}

const captureStackTrace = Error.captureStackTrace;

const tests = {

  ErrorSubclass: {

    'Subclass of ErrorSubclass': {

      'can be instantiated': () => {
        doesNotThrow(() => new SubSubError(ERROR_MESSAGE));
      },

      'SubSubclass instance': {

        afterEach() {
          Error.captureStackTrace = captureStackTrace;
        },

        'should be instanceof Error': () => {
          const instance = new SubSubError(ERROR_MESSAGE);
          ok(instance instanceof Error);
          ok(instance instanceof SubSubError);
        },

        'should have a name': () => {
          const instance = new SubSubError(ERROR_MESSAGE);
          equal(instance.name, 'SubSubError');
        },

        'should have a message': () => {
          const instance = new SubSubError(ERROR_MESSAGE);
          equal(instance.message, ERROR_MESSAGE);
        },

        'has a toString() method': () => {
          const instance = new SubSubError(ERROR_MESSAGE);
          equal(typeof instance.toString, 'function');
          equal(instance.toString(), `SubSubError: ${ERROR_MESSAGE}`);
        },

        'when captureStackTrace is supported, should have a stack': () => {
          equal(typeof Error.captureStackTrace, 'function');
          const instance = new SubSubError(ERROR_MESSAGE);
          ok(instance.stack);
          equal(typeof instance.stack, 'string');
          ok(instance.stack.match(`SubSubError: ${ERROR_MESSAGE}`));
        },

        // 'when captureStackTrace is not supported, should have a stack': () => {
        //   // TODO: how to test?
        // },
      },
    },
  },
};

export default tests;
