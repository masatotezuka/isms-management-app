import Axios from 'axios';
import { API_URL } from '../config';
import { getAccessTokenFromCookie } from '../functions';

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const accessToken = getAccessTokenFromCookie();
  if (config.headers) {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});
