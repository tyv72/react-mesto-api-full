module.exports = class IncorrectTokenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
