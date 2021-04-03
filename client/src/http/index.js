import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// тут необходимо подставлять токен к каждому запросу
const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// добавляем токен в заголовок запроса authorizations
const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

// добавляет интерсептор в каждый запрос, чтобы передавать токен
$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
