import http from './http';
import { formatDistance } from 'date-fns';
import * as Auth from '../utils/auth';

function transformTweet(item) {
  const { _id, createdAt = '' } = item;
  const date = formatDistance(new Date(createdAt), new Date());
  return {
    id: _id,
    date,
    ...item,
  };
}

function transformTweets(items) {
  return items.map(transformTweet);
}

export function getTweets() {
  return http.get('/tweets').then((response) => {
    const { data = {} } = response;

    const { success, items = [] } = data;
    const [item = {}] = items;
    const { tweets = [] } = item;
    const payload = transformTweets(tweets);

    if (success) {
      return Promise.resolve(payload);
    } else {
      const { message = '' } = data;
      return Promise.reject(message);
    }
  });
}

export function getTweet({ id }) {
  return http.get(`/tweets/${id}`).then((response) => {
    const { data = {} } = response;

    const { success, items: [item = {}] = [] } = data;
    const payload = transformTweet(item);

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

  return http
    .post(
      '/tweets',
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
