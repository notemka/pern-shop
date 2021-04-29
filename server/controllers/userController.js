const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models');

const generateToken = (id, expiresIn) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn,
  });
};

class UserController {
  async registation(email, password, role) {
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
    const accessToken = generateToken(user.id, '30min');
    const refreshToken = generateToken(user.id, '60d');
    const userData = {
      me: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
    return userData;
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

      const accessToken = generateToken(user.id, '30min');
      const refreshToken = generateToken(user.id, '60d');
      const userData = {
        me: {
          id: user.id,
          email: user.email,
          role: user.role,
          refreshToken,
        },
        accessToken,
      };
      return userData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async check(user) {
    const { id, email, role } = user;
    const accessToken = generateToken(id, '30min');
    const refreshToken = generateToken(id, '60d');
    const userData = {
      me: { id, email, role },
      accessToken,
      refreshToken,
    };
    return userData;
  }
}

module.exports = new UserController();
