const router = require('express').Router();
const auth = require('../middlewares/auth');
// const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article');

router.get('/articles', getArticles);

router.post('/articles', celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required().min(2).max(30),
      title: Joi.string().required().min(2).max(30),
      text: Joi.string().min(2).required(),
      date: Joi.string().min(2).required(),
      source: Joi.string().min(2).required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
    })
  }), createArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), auth, deleteArticle);

module.exports = router;