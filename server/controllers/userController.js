const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models');

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registation(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или пароль'));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('Такой пользователь уже существует'));
    }

    const hashPasword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPasword, role });
    await Basket.create({ userId: user.id });
    const token = generateToken(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(
        ApiError.badRequest('Пользователь с таким email не существует')
      );
    }
    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest('Неверный пароль'));
    }

    const token = generateToken(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res) {
    const { user } = req;
    const token = generateToken(user.id, user.email, user.role);

    res.json({ token });
  }
}

module.exports = new UserController();
