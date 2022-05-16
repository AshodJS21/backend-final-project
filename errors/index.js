class ControllerError extends Error {}

class NotFound extends ControllerError {
  constructor(message) {
    super();
    this.message = `${message} not found`;
    this.errorCode = 404;
  }
}

class Forbidden extends ControllerError {
  constructor() {
    super();
    this.message = "not found";
    this.errorCode = 405;
  }
}

class WrongLogin extends ControllerError {
  constructor() {
    super();
    this.message = ` not match`;
    this.errorCode = 406;
  }
}

class UnsupportedFileType extends ControllerError {
  constructor(message) {
    super();
    this.message = message;
    this.errorCode = 415;
  }
}

class FileExists extends ControllerError {
  constructor(fileName) {
    super();
    this.message = `${fileName} the name is already exists.`;
    this.errorCode = 500;
  }
}

class Unauthorized extends ControllerError {
  constructor() {
    super();
    this.message = `unable`;
    this.errorCode = 401;
  }
}

class WrongRequest extends ControllerError {
  constructor(...message) {
    super();
    this.message = `missing ${message.join(", ")}`;
    this.errorCode = 400;
  }
}

module.exports = {
  ControllerError,
  NotFound,
  Forbidden,
  WrongLogin,
  UnsupportedFileType,
  FileExists,
  Unauthorized,
  WrongRequest,
};
