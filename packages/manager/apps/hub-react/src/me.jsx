import React from 'react';
import { useQuery } from 'react-query';

import style from './app.module.scss';

function getMe() {
  return fetch('/engine/apiv6/me', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
    },
    credentials: 'same-origin',
  }).then((res) => res.json());
}

export default function Me() {
  const { isLoading, error, data: me } = useQuery('me', getMe);

  if (isLoading) return 'Loading ...';
  if (error) return `An error occured: ${error.message}`;

  return (
    <div>
      <pre
        className={`${style.welcome}`}
      >{`Welcome to React\nLogged in as: ${me.nichandle}`}</pre>
    </div>
  );
}
