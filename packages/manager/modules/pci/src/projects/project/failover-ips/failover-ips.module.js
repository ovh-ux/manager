import angular from 'angular';
import 'angular-translate';
import '@uirouter/angularjs';

import failoverIp from './failover-ip';
import imports from './imports';
import onboarding from './onboarding';
import order from './order';

import component from './failover-ips.component';
import routing from './failover-ips.routing';

const moduleName = 'ovhManagerPciProjectFailoverIps';

angular
  .module(moduleName, [
    'ui.router',
    'pascalprecht.translate',
    failoverIp,
    imports,
    onboarding,
    order,
  ])
  .config(routing)
  .component('pciProjectFailoverIps', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
