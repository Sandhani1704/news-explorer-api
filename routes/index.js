const generalRouter = require('express').Router();

generalRouter.use('/', require('./users'));

generalRouter.use('/', require('./article'));

generalRouter.use('/', require('./nonexistent'));

module.exports = generalRouter;
