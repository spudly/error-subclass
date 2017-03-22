/* eslint-disable prefer-reflect */

const ErrorSubclass = function ErrorSubclass(...args) {
  const [message] = args;
  const _error = Error.apply(this, args);

  Object.defineProperty(this, 'message', {value: message});
  Object.defineProperty(this, 'name', {value: this.constructor.name});

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    Object.defineProperty(this, 'stack', {
      get() {
        return _error.stack;
      }
    });
  }
};

ErrorSubclass.prototype = Error.prototype;

ErrorSubclass.prototype.toString = function toString() {
  return `${this.name}: ${this.message}`;
};

export default ErrorSubclass;
