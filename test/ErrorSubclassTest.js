import ErrorSubclass from '../src/ErrorSubclass';
import {ok, equal, throws, doesNotThrow} from 'assert';

const ERROR_MESSAGE = '__MESSAGE__';

class SubSubError extends ErrorSubclass {}

var instance;

var tests = {

  ErrorSubclass: {

    'Subclass of ErrorSubclass': {

      'can be instantiated': function () {
        doesNotThrow(function () {
          instance = new SubSubError(ERROR_MESSAGE);
        });
      },

      'SubSubclass instance': {

        before: function () {
          instance = new SubSubError(ERROR_MESSAGE);
        },

        'should be instanceof Error': function () {
          ok(instance instanceof Error);
          ok(instance instanceof SubSubError);
        },

        'should have a name': function () {
          equal(instance.name, 'SubSubError');
        },

        'should have a stack': function () {
          ok(instance.stack);
          equal(typeof instance.stack, 'string');
          ok(instance.stack.match('SubSubError: ' + ERROR_MESSAGE));
        },

        'should have a message': function () {
          equal(instance.message, ERROR_MESSAGE);
        },

        'has a toString() method': function () {
          equal(typeof instance.toString, 'function');
          equal(instance.toString(), 'SubSubError: ' + ERROR_MESSAGE);
        }

      }

    }

  }
};

export default tests;
