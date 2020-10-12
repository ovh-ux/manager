import angular from 'angular';

import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import 'angular-translate';

import component from './storages.component';
import service from './storages.service';
import netapp from './netapp';

import routing from './storages.routing';

const moduleName = 'ovhManagerStorage';

angular
  .module(moduleName, [
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
    netapp,
  ])
  .config(routing)
  .component('storage', component)
  .service('StoragesService', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
