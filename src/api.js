import axios from 'axios';
import history from './history';

const BASE_URL = `https://es31-server.appspot.com/six-cities`;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true
});

const onSuccess = (response) => response;
const onFail = (err) => {
  const response = err.response;

  if (response.status === 403 && response.config.url !== `${BASE_URL}/login`) {
    history.push(`/login`);
  }

  return err;
};

api.interceptors.response.use(onSuccess, onFail);

export default api;
