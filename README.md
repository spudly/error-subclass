# ErrorSubclass [![Build Status](https://travis-ci.org/spudly/error-subclass.svg?branch=master)](https://travis-ci.org/spudly/error-subclass)

A JavaScript class that inherits from Error (in all the right ways), so that you
can safely and easily create your own Error subclasses.

The provided class handles all the craziness for preserving stack traces and
other things so that you don't have to worry about it.

## Usage

### es6
```js
import ErrorSubclass from 'error-subclass/es6';

class MyError extends ErrorSubclass {

  // Add extra properties/methods if desired:

  get code() {
    return 'MYERROR';
  }

}

// later...
throw new MyError('error message');
```

### es5 (nodejs, browserify)
```javascript
var ErrorSubclass = require('error-subclass'),
    util = require('util');

function MyError() {
  ErrorSubclass.call(this);
}
util.inherits(MyError, ErrorSubclass);

// Add extra properties/methods if desired:
MyError.prototype.code = 'MYERROR';

// later...
throw new MyError('error message');
```

### coffeescript
```coffeescript
ErrorSubclass = require 'error-subclass'

class MyError extends ErrorSubclass
  # Add extra properties/methods if desired:
  code: 'MYERROR'

# later...
throw new MyError 'error message'
```

## License

MIT
