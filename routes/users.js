const router = require('express').Router(); // создали роутер
const auth = require('../middlewares/auth');
const { createUserValid, loginUserValid } = require('../constants/validation');

const {
  getUserInfo,
  createUser,
  login,
} = require('../controllers/users');

router.get('/users/me', auth, getUserInfo); // возвращает информацию о текущем пользователе

// роуты для логина и регистрации не требующие авторизации
router.post('/signup', createUserValid, createUser);

router.post('/signin', loginUserValid, login);

module.exports = router; // экспортировали роутер
