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

    const { items = [] } = data;
    const [item = {}] = items;
    const { tweets = [] } = item;
    const payload = transformTweets(tweets);

    return payload;
  });
}

export function getTweet({ id }) {
  return http.get(`/tweets/${id}`).then((response) => {
    const { data = {} } = response;

    const { items: [item = {}] = [] } = data;
    const payload = transformTweet(item);

    return payload;
  });
}

export function newTweet({ content = '' }) {
  return http.post(
    '/tweets',
    {
      content,
    },
    {
      headers: {
        'x-access-token': Auth.getToken(),
      },
    }
  );
}
