import angular from 'angular';

import atInternet from '@ovh-ux/ng-at-internet';
import ovhManagerHub from '@ovh-ux/manager-hub';

import exchangeRouting from './exchange.routing';
import ipRouting from './ip.routing';
import sharepointRouting from './sharepoint.routing';
import vrackRouting from './vrack.routing';

import routing from './routing';

const moduleName = 'ovhManagerHubProductListingPage';

angular
  .module(moduleName, [atInternet, ovhManagerHub])
  .config(routing)
  .config(exchangeRouting)
  .config(ipRouting)
  .config(sharepointRouting)
  .config(vrackRouting);

export default moduleName;
