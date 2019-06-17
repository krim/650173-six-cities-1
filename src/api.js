import axios from 'axios';
import history from './history';

const BASE_URL = `https://es31-server.appspot.com/six-cities`;
const ERROR_STATUSES = [404, 500, 503, 504];

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true
});

const onSuccess = (response) => response;
const onFail = (error) => {
  const response = error.response;

  if (response.status === 403 && response.config.url !== `${BASE_URL}/login`) {
    history.push(`/login`);
  }

  if (error.response === void 0 || ERROR_STATUSES.includes(error.response.status)) {
    history.push(`/error`);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(onSuccess, onFail);

export default api;
