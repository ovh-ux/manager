import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@ovh-ux/ui-kit/dist/css/oui.css';
import 'src/app.scss';

import BillingServices from 'src/components/billing/services';

const queryClient = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <BillingServices
            billingUrl={
              'https://www.ovh.com/manager/dedicated/#/billing/autorenew'
            }
          />
        </div>
      </div>
    </div>
  </QueryClientProvider>,
  document.getElementById('app'),
);
