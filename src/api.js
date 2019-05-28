import axios from 'axios';

export const createAPI = (_dispatch) => {
  return axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });
};
