import angular from 'angular';
import '@uirouter/angularjs';
import '@ovh-ux/manager-core';
import 'oclazyload';

const moduleName = 'ovhManagerDedicatedCloudBackupDeleteLazyloading';

angular
  .module(moduleName, ['oc.lazyLoad', 'ovhManagerCore', 'ui.router'])
  .config(
    /* @ngInject */ ($stateProvider) => {
      $stateProvider.state('app.dedicatedClouds.datacenter.backup.delete.**', {
        url: '/delete',
        lazyLoad: ($transition$) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
          return import('./delete.module').then((mod) =>
            $ocLazyLoad.inject(mod.default || mod),
          );
        },
      });
    },
  );

export default moduleName;
