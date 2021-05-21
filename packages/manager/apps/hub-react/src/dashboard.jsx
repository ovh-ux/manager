import React from 'react';
import { Link } from 'react-router-dom';

import '@ovh-ux/ui-kit/dist/css/oui.css';
import 'src/app.scss';

import BillingServices from 'src/components/billing/services';
import HubWelcome from 'src/components/hub/welcome';
import OrdersTracking from 'src/components/orders/tracking';

export default function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-md-12">
          <HubWelcome />
        </div>
        <div className="col-md-12">
          <Link to="/products">Routing test</Link>
        </div>
        <div className="col-md-8">
          <BillingServices
            billingUrl={
              'https://www.ovh.com/manager/dedicated/#/billing/autorenew'
            }
          />
        </div>
        <div className="col-md-4">
          <OrdersTracking />
        </div>
      </div>
    </div>
  );
}
