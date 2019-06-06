import axios from 'axios';

const BASE_URL = `https://es31-server.appspot.com/six-cities`;

export const createAPI = (history) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      history.push(`/login`);
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
