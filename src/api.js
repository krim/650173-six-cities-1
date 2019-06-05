import axios from 'axios';

const BASE_URL = `https://es31-server.appspot.com/six-cities`;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true
});

const onSuccess = (response) => response;
const onFail = (err) => {
  if (err.response.status === 403) {
    history.pushState(null, null, `/login`);
  }
  return err;
};

api.interceptors.response.use(onSuccess, onFail);

export default api;
