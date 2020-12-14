const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createArticleValid, deleteArticleValid } = require('../constants/validation');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article');

router.get('/articles', auth, getArticles);

router.post('/articles', createArticleValid, auth, createArticle);

router.delete('/articles/:articleId', deleteArticleValid, auth, deleteArticle);

module.exports = router;
