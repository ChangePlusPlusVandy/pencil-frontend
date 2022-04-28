/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import firebase from 'firebase';

async function refreshAccessToken() {
  const user = firebase.auth().currentUser;
  const token = await user.getIdToken();
  console.log(token);
  return token;
}

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_PROXY}/api`,
  headers: {
    authorization: `Bearer ${localStorage.getItem('@token')}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      localStorage.setItem('@token', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
