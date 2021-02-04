import axios from 'axios';

import * as Auth from '../utils/auth';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const instance = axios.create({
  baseURL: BASE_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const {
      data: { success, message },
    } = response;
    if (success) {
      return response;
    } else {
      return Promise.reject(message);
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      Auth.clearToken();
      document.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
