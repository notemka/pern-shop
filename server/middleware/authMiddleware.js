const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const errorMessage = 'Пользователь не авторизован';

//   if (req.method === 'OPTIONS') {
//     next();
//   }

//   try {
//     const token = req.headers.authorization.split(' ')[1]; // возвращает 'Bearer <token>'

//     if (!token) {
//       res.status(401).json({ message: errorMessage });
//     }
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ message: errorMessage });
//   }
// };

module.exports = (req) => {
  // Получаем HTTP-заголовок с информацией об аутентификации
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Получаем токен: Bearer <token>
    const token = authHeader.split(' ')[1];

    if (token) {
      try {
        // Проверяем аутентификацию
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        return user;
      } catch (err) {
        console.log(err);
        throw new Error('Неправильный/Устаревший токен');
      }
    }

    throw new Error("Токен аутентификации должен иметь вид 'Bearer [token]'");
  }
  throw new Error('Должен быть предоставлен HTTP-заголовок "Authorization"');
};
