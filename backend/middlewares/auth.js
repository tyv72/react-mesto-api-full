const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const IncorrectTokenError = require('../errors/IncorrectTokenError');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new IncorrectTokenError('Некорректный токен');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new IncorrectTokenError('Некорректный токен');
  }

  req.user = payload;

  next();
};
