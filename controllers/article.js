const Article = require('../models/article');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');


// возвращает все сохранённые пользователем статьи
const getArticles = (req, res, next) => {
  Article.find({})
    .then((data) => res.send(data))
    .catch(next);
};

// создаёт статью
const createArticle = (req, res, next) => {
  const { _id } = req.user;
  const {
    keyword, title, text, date, source, link, image
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: _id,
  })
    .then((article) => res.status(200).send(article))
    .catch((err) => {
      // console.log(err);
      if (err.name === 'ValidationError') {
        throw new BadRequestError('переданы некорректные данные в метод');
      } else next(err);
    });
};

// удаляет сохранённую статью  по _id
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
  .select("+owner")
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Нет статьи с таким id');
      } else if (article.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Удалять можно только свои статьи');
      } else {
        Article.findByIdAndDelete(req.params.articleId)
          .then(() => res.send({ message: 'статья удалена' }));
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
}
