import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.daca.org.ng/api'
});

const token = typeof window == 'undefined' ? null : localStorage.getItem('token');

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token == null ? '' : token}`;
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