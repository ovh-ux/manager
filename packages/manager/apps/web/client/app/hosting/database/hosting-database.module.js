import detachPrivate from './detach-private';
import HostingDatabaseOrderPublic from './order/public/hosting-database-order-public.service';
import orderPrivate from './order/private';
import orderPublic from './order/public';

import routing from './hosting-database.routing';

const moduleName = 'ovhManagerHostingDatabase';

angular
  .module(moduleName, [detachPrivate, orderPrivate, orderPublic])
  .config(routing)
  .service('HostingDatabaseOrderPublicService', HostingDatabaseOrderPublic);

export default moduleName;
