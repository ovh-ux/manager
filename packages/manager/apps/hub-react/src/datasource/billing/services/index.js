import { BillingService } from '@ovh-ux/manager-models';
import { aapi } from 'src/api-connector';

export const get = () => {
  return aapi
    .get('/hub/billingServices')
    .then((res) => res.data?.data?.billingServices?.data?.data)
    .then((services) => services.map((service) => new BillingService(service)));
};

export default get;
