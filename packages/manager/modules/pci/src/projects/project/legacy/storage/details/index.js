import angular from 'angular';
import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'oclazyload';
import 'ovh-ui-angular';

import services from '../services';

import controller from './controller';
import template from './template.html';

const moduleName = 'ovhManagerPciProjectStorageDetails';

angular
  .module(moduleName, [
    'oc.lazyLoad',
    'oui',
    'ovhManagerCore',
    services,
    'ui.router',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider
      .state('pci.projects.project.legacy.compute.storage.detail-container', {
        url: '/{storageId}',
        views: {
          'cloudProjectCompute@pci.projects.project.legacy.compute': {
            template,
            controller,
            controllerAs: 'RA.storageDetailsCtrl',
          },
        },
      });
  })
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
