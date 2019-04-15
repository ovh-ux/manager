import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-translate';
import '@ovh-ux/ng-translate-async-loader';
import '@ovh-ux/ng-ovh-uirouter-layout';
import '@ovh-ux/ng-ovh-swimming-poll';

import component from './add.component';
import routing from './add.routing';
import service from './add.service';

const moduleName = 'ovhManagerPciPrivateNetworksVrackAdd';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'ui.router',
    'ngOvhSwimmingPoll',
    'ngOvhUiRouterLayout',
  ])
  .config(routing)
  .component('pciProjectPrivateNetworksVrackCreate', component)
  .service('PciPrivateNetworksVrackAdd', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
