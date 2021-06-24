import angular from 'angular';
import 'angular-translate';

import component from './component';

const moduleName = 'ovhManagerDedicatedCloudUpgradeRange';

angular
  .module(moduleName, [])
  .component('dedicatedCloudUpgradeRange', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
