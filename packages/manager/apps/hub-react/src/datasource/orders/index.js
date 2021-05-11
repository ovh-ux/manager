import { aapi } from 'src/api-connector';

export const getLastOrder = () => {
  return aapi
    .get('/hub/lastOrder')
    .then((res) => res.data?.data?.lastOrder?.data);
};

export default getLastOrder;
