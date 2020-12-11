const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError')


// Валидация адреса
module.exports = (v) => {
  if (!validator.isURL(v)) {
    throw new BadRequestError('Неправильный формат ссылки');
  } else {
    return v;
  }
};