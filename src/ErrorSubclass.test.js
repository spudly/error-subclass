import {doesNotThrow, equal, ok} from 'assert';
import ErrorSubclass from '../src/ErrorSubclass';

const ERROR_MESSAGE = '__MESSAGE__';

class SubSubError extends ErrorSubclass {
  static displayName = 'SubSubErrorDisplayName';
}

const {captureStackTrace} = Error;

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

        'should have a name that matches the displayName': () => {
          const instance = new SubSubError(ERROR_MESSAGE);
          equal(instance.name, 'SubSubErrorDisplayName');
        },

        'should have a message': () => {
          const instance = new SubSubError(ERROR_MESSAGE);
          equal(instance.message, ERROR_MESSAGE);
        },

        'has a toString() method': () => {
          const instance = new SubSubError(ERROR_MESSAGE);
          equal(typeof instance.toString, 'function');
          equal(instance.toString(), `SubSubErrorDisplayName: ${ERROR_MESSAGE}`);
        },

        'when captureStackTrace is supported, should have a stack': () => {
          equal(typeof Error.captureStackTrace, 'function');
          const instance = new SubSubError(ERROR_MESSAGE);
          ok(instance.stack);
          equal(typeof instance.stack, 'string');
          ok(instance.stack.match(`SubSubErrorDisplayName: ${ERROR_MESSAGE}`));
        }

        // 'when captureStackTrace is not supported, should have a stack': () => {
        //   // TODO: how to test?
        // },
      }
    }
  }
};

export default tests;
