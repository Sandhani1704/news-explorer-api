const { celebrate, Joi } = require('celebrate');
const validUrl = require('../middlewares/validUrl');

const createArticleValid = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().min(2).required(),
    date: Joi.string().min(2).required(),
    source: Joi.string().min(2).required(),
    link: Joi.string().required().custom((v) => validUrl(v)),
    image: Joi.string().required().custom((v) => validUrl(v)),
  }),
});

const deleteArticleValid = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24),
  }),
});

const createUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const loginUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  createArticleValid,
  deleteArticleValid,
  createUserValid,
  loginUserValid,
};
