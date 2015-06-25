import ErrorSubclass from '../src/ErrorSubclass';
import {ok, equal, throws, doesNotThrow} from 'assert';

const ERROR_MESSAGE = '__MESSAGE__'

describe('ErrorSubclass', function() {

  it('can\'t be directly instantiated', function() {
    throws(function() {
      new ErrorSubclass(ERROR_MESSAGE);
    });
  });

  describe('Subclass of ErrorSubclass', function() {

    class SubSubError extends ErrorSubclass {}

    it('can be instantiated', function() {
      doesNotThrow(function() {
        new SubSubError(ERROR_MESSAGE);
      });
    });

    describe('SubSubclass instance', function() {
      var instance;

      before(function() {
        instance = new SubSubError(ERROR_MESSAGE);
      });

      it('should have a name', function() {
        equal(instance.name, 'SubSubError');
      });

      it('should have a stack', function() {
        ok(instance.stack);
        equal(typeof instance.stack, 'string');
        ok(instance.stack.match('SubSubError: ' + ERROR_MESSAGE));
      });

      it('should have a message', function() {
        equal(instance.message, ERROR_MESSAGE);
      });

      it('has a toString() method', function() {
        equal(typeof instance.toString, 'function');
        equal(instance.toString(), 'SubSubError: ' + ERROR_MESSAGE);
      });

    });

  });

});
