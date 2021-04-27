import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Me from './me.jsx';

const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Me />
  </QueryClientProvider>,
  document.getElementById('app'),
);
