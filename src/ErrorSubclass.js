function ErrorSubclass (message) {
  Error.call(this, message);
  if (this.constructor === ErrorSubclass) {
    throw new Error('Don\'t instantiate ErrorSubclass directly. Extend it.');
  }

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    Object.defineProperty(this, 'stack', {
      value: (new Error()).stack
    });
  }

  Object.defineProperty(this, 'message', {value: message});
}

ErrorSubclass.prototype = Object.create(Error.prototype, {
  name: {
    get: function () {
      return this.constructor.name;
    }
  }
});

ErrorSubclass.prototype.toString = function () {
  return this.name + ': ' + this.message;
};

export default ErrorSubclass;
