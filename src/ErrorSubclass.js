class ErrorSubclass extends Error {

  constructor (message) {
    super(message);

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

    Object.defineProperty(this, 'message', {
      value: message
    });
  }

  get name () {
    return this.constructor.name;
  }

  toString () {
    return this.name + ': ' + this.message;
  }

}

export default ErrorSubclass;
