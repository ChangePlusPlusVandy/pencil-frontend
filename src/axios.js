/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import firebase from 'firebase';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 5 * 60 * 1000,
});

async function refreshAccessToken() {
  const user = firebase.auth().currentUser;
  const token = await user.getIdToken();
  return token;
}

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_PROXY}/api`,
  headers: {
    authorization: `Bearer ${localStorage.getItem('@token')}`,
  },
  adapter: cache.adapter,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      localStorage.setItem('@token', accessToken);

      axiosInstance.interceptors.request.use(
        (config) => {
          // eslint-disable-next-line no-param-reassign
          config.headers.authorization = `Bearer ${accessToken}`;
          return config;
        },
        (err) => Promise.reject(err)
      );
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
