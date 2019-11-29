import angular from 'angular';

import routing from './delete.routing';

import component from './delete.component';
import service from '../serving.service';

const moduleName = 'ovhManagerPciServingDelete';

angular.module(moduleName, [])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */)
  .component('ovhManagerPciServingDelete', component)
  .service('ovhManagerPciServing', service);


export default moduleName;
