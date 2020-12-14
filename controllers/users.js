const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже зарегистрирован');
      }
    })
    .catch(next);

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.status(200).send({
      data: {
        name: user.name,
        email: user.email,
      },
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      // В пейлоуд токена следует записывать только свойство _id
      // содержащее идентификатор пользователя
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((userById) => {
      if (userById === null) {
        throw new NotFoundError('Пользователя нет в базе данных');
      }
      res
        .status(200)
        .send(userById);
    })
    .catch(() => {
      throw new NotFoundError('Пользователя нет в базе данных');
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserInfo,
};
