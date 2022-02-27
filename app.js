require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/rate-limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const generalRouter = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { requestCors } = require('./middlewares/cors');

// Слушаем 3000 порт
const { PORT = 3000, MONGODB, NODE_ENV } = process.env;
// console.log(process.env);

const app = express();

app.use(limiter);

app.use(helmet());

app.use(cors());
app.use(requestCors);

mongoose.connect(NODE_ENV === 'production' ? MONGODB : 'mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use('/', generalRouter);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
