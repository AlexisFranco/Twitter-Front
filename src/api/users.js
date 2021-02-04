import axios from 'axios';
import * as Auth from '../utils/auth';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export function login({ username = '', password = '' }) {
  return axios
    .post(`${BASE_API_URL}/users/login`, {
      username,
      password,
    })
    .then((response) => {
      const { data = {} } = response;

      const { success, items: [item = {}] = [] } = data;
      const { token = '', user = {} } = item;
      Auth.setToken({ token });
      const payload = user;

      if (success) {
        return Promise.resolve(payload);
      } else {
        const { message = '' } = data;
        return Promise.reject(message);
      }
    });
}

export function signup({
  name = '',
  username = '',
  email = '',
  password = '',
  passwordConfirmation = '',
}) {
  return axios
    .post(`${BASE_API_URL}/users`, {
      name,
      username,
      email,
      password,
      passwordConfirmation,
    })
    .then((response) => {
      const { data = {} } = response;

      const { success } = data;
      const payload = {};

      if (success) {
        return Promise.resolve(payload);
      } else {
        const { message = '' } = data;
        return Promise.reject(message);
      }
    });
}
