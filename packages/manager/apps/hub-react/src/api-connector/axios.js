import axios from 'axios';

export default () => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
    },
    credentials: 'same-origin',
  });

  return {
    v6: {
      get(url) {
        return instance.get(url, {
          baseURL: '/engine/apiv6',
        });
      },
      post(url, data) {
        return instance.post(url, data, {
          baseURL: '/engine/apiv6',
        });
      },
    },
    aapi: {
      get(url) {
        return instance.get(url, {
          baseURL: '/engine/2api',
        });
      },
      post(url, data) {
        return instance.post(url, data, {
          baseURL: '/engine/2api',
        });
      },
    },
  };
};
