const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models');

const generateToken = (id, email, role, expiresIn) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn,
  });
};

class UserController {
  async registration(email, password, role) {
    if (!email || !password) {
      throw new Error('Некорректный email или пароль');
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw new Error('Такой пользователь уже существует');
    }

    const hashPasword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPasword, role });
    await Basket.create({ userId: user.id });
    const token = generateToken(user.id, user.email, user.role, '30min');
    return { token };
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Пользователь с таким email не существует');
      }
      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        throw new Error('Неверный пароль');
      }

      const token = generateToken(user.id, user.email, user.role, '30min');
      return { token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async check(user) {
    const { id, email, role } = user;
    const token = generateToken(id, email, role, '30min');
    return { token };
  }
}

module.exports = new UserController();
