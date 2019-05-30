import axios from 'axios';

export const createAPI = () => {
  return axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true
  });
};
