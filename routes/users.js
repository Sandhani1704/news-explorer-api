const router = require('express').Router(); // создали роутер
const auth = require('../middlewares/auth');

const {
  getUserInfo,
} = require('../controllers/users');

router.get('/users/me', auth, getUserInfo); // возвращает информацию о текущем пользователе

module.exports = router; // экспортировали роутер
