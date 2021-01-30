import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.4:5000',
});
api.defaults.withCredentials = true;

export default api;
