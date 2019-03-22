import angular from 'angular';
import '@uirouter/angularjs';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-api-services';

import addOldController from './add_OLD_/controller';
import addOldTemplate from './add_OLD_/template.html';

import dropdownComponent from './dropdown/component';

import failoverBuyAgoraController from './failover/buy/agora.controller';
import failoverBuyAgoraTemplate from './failover/buy/agora.template.html';
import failoverBuyController from './failover/buy/controller';
import failoverBuyTemplate from './failover/buy/template.html';
import failoverImportController from './failover/import/controller';
import failoverImportTemplate from './failover/import/template.html';

const moduleName = 'ovhManagerPciProjectComputeInfrastructureIp';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('ipDropdown', dropdownComponent)
  .controller('CloudProjectComputeInfrastructureIpAddCtrl', addOldController)
  .controller('CloudProjectComputeInfrastructureIpFailoverBuyAgoraCtrl', failoverBuyAgoraController)
  .controller('CloudProjectComputeInfrastructureIpFailoverBuyCtrl', failoverBuyController)
  .controller('CloudProjectComputeInfrastructureIpFailoverImportCtrl', failoverImportController)
  .run(/* @ngInject */($templateCache) => {
    $templateCache.put('pci/project/compute/infrastructure/ip/add_OLD_/template.html', addOldTemplate);
    $templateCache.put('pci/project/compute/infrastructure/ip/failover/buy/agora.template.html', failoverBuyAgoraTemplate);
    $templateCache.put('pci/project/compute/infrastructure/ip/failover/buy/template.html', failoverBuyTemplate);
    $templateCache.put('pci/project/compute/infrastructure/ip/failover/import/template.html', failoverImportTemplate);
  })
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
