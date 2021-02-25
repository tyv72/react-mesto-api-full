const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { JWT_SECRET } = require('../config/config');

module.exports.createUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с указанным email уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email, password: hash,
    }))
    .then(({ _id }) => res.send({ data: _id }))
    .catch(next);
};

module.exports.sendUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.sendUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user == null) {
        throw new NotFoundError(`Пользователь с идентификатором ${req.user._id} не найден`);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.sendUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user == null) {
        throw new NotFoundError(`User with id = ${req.params.id} not found`);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user == null) {
        throw new NotFoundError(`Пользователь с идентификатором ${req.user._id} не найден`);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user == null) {
        throw new NotFoundError(`Пользователь с идентификтором ${req.user._id} не найден`);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
