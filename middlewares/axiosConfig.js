import axios from 'axios';
import Cookies from 'js-cookie';

const prodUrl = 'https://api.daca.org.ng/api';
const devUrl = 'http://localhost:5000/api';

let url = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

const axiosInstance = axios.create({
  baseURL: url
});

const token = typeof window == 'undefined' ? null : Cookies.getJSON('user');

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${typeof token == "undefined" || token == null ? '' : token.token}`;
axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axiosInstance.defaults.headers.common['Access-Control-Allow-Methods'] = `GET, POST, OPTIONS`;
axiosInstance.defaults.headers.common['Cache-Control'] = `no-store`;

axiosInstance.interceptors.request.use(request => {
  // Edit request config
  return request;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  // Edit response config
  return response;
}, error => {
  return Promise.reject(error.response);
});

export default axiosInstance;