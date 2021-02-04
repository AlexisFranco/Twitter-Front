import axios from 'axios';
import * as Auth from '../utils/auth';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export function getTweets() {
  return axios.get(`${BASE_API_URL}/tweets`).then((response) => {
    const { data = {} } = response;

    const { success, items = [] } = data;
    const [item = {}] = items;
    const { tweets = [] } = item;
    const payload = tweets;

    if (success) {
      return Promise.resolve(payload);
    } else {
      const { message = '' } = data;
      return Promise.reject(message);
    }
  });
}

export function getTweet({ id }) {
  return axios.get(`${BASE_API_URL}/tweets/${id}`).then((response) => {
    const { data = {} } = response;

    const { success, items: [item = {}] = [] } = data;
    const payload = item;

    if (success) {
      return Promise.resolve(payload);
    } else {
      const { message = '' } = data;
      return Promise.reject(message);
    }
  });
}

export function newTweet({ content = '' }) {
  const token = Auth.getToken();

  return axios
    .post(
      `${BASE_API_URL}/tweets`,
      {
        content,
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    )
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
