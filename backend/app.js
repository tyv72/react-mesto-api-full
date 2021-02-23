const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, CelebrateError } = require('celebrate');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const registerValidator = require('./middlewares/validators/register');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   req.user = {
//     _id: '601e97cd432d5931f0caae83',
//   };

//   next();
// });

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', registerValidator, createUser);

// авторизация
app.use(auth);

app.use(cards);
app.use(users);

app.all('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err instanceof CelebrateError) {
    res
      .status(400)
      .send({
        message: err.details.get('body'),
      });
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? `На сервере произошла ошибка: ${err.message}`
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
