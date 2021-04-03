require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileupload = require('express-fileupload');
const router = require('./routes');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 4000;
const app = express();
// чтобы с клиента можно было делать запросы на серевер
app.use(cors());
// по-умолчанию express не умеет парсить json формат
// и возвращает undefined, если в тело запроса отправлены json данные
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload({}));
app.use('/api', router);

// Обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
  try {
    // устанавливается подключение к бд
    await sequelize.authenticate();
    // сверяет состояние бд со схемой данных, которую мы описали
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
