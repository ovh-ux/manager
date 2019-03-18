import angular from 'angular';
import '@uirouter/angularjs';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';

import users from './users';

import controller from './controller';
import template from './template.html';

// TODO : import './index.less';

const moduleName = 'ovhManagerPciProjectOpenstack';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    users,
  ])
  .config(/* @ngInject */ ($stateProvider) => {
    $stateProvider
      .state('iaas.pci-project.compute.openstack', {
        url: '/openstack',
        views: {
          cloudProjectCompute: {
            template,
            controller,
            controllerAs: 'CloudProjectOpenstackCtrl',
          },
        },
        redirectTo: 'iaas.pci-project.compute.openstack.users',
      });
  })
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
