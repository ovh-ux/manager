import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { detach as detachPreloader } from '@ovh-ux/manager-preloader';

import '@ovh-ux/ui-kit/dist/css/oui.css';
import 'src/app.scss';
import Dashboard from './dashboard';

/*
 * Notes:
 *  - Suspense is required because translations are asynchronously loaded with i18next-http-backend
 *    every components using translations becomes asynchronous and must be wrapped in Suspense
 *  - Suspense doesn't need a fallback here because manager-preloader is used instead
 *
 * Working with manager-preloader is not optimal since normally the common usage would be to have
 * a fallback component used by Suspense. For this POC i did reuse the manager-preloader but
 * it would be wise to implement a preloader component to clean-up the code.
 */

const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback="">
      {detachPreloader()}
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/products">
            <h1>Products</h1>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  </QueryClientProvider>,
  document.getElementById('app'),
);
