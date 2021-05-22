const jwt = require('jsonwebtoken');

module.exports = (role) => {
  return (req, res, next) => {
    const errorMessage = 'Пользователь не авторизован';

    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; // возвращает 'Bearer <token>'

      if (!token) {
        return res.status(401).json({ message: errorMessage });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (decoded.role !== role) {
        return res.status(403).json({ message: 'Нет доступа' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: errorMessage });
    }
  };
};
