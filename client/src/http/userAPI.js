import jwt_decode from 'jwt-decode';
import { $authHost, $host } from '.';

export const registration = async (email, password) => {
  try {
    const {
      data: { token },
    } = await $host.post('api/user/registration', {
      email,
      password,
      role: 'ADMIN',
    });

    localStorage.setItem('token', token);
    return jwt_decode(token);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const {
      data: { token },
    } = await $host.post('api/user/login', {
      email,
      password,
    });

    localStorage.setItem('token', token);
    return jwt_decode(token);
  } catch (error) {
    throw new Error(error.message);
  }
};

// для проверки залогинен ли юзер после перезагрузки страницы
export const check = async () => {
  try {
    const {
      data: { token },
    } = await $authHost.get('api/user/auth');

    localStorage.setItem('token', token);
    return jwt_decode(token);
  } catch (error) {
    console.error(error.message);
  }
};
