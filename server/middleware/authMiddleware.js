const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const errorMessage = 'Пользователь не авторизован';

  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // возвращает 'Bearer <token>'

    if (!token) {
      res.status(401).json({ message: errorMessage });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: errorMessage });
  }
};
