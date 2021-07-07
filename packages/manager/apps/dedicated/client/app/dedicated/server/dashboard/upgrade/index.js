import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'ovhManagerDedicatedServerDashboardUpgrade';

angular
  .module(moduleName, ['ui.router', 'oc.lazyLoad'])
  .config(
    /* @ngInject */ ($stateProvider) => {
      $stateProvider.state('app.dedicated-server.server.dashboard.upgrade.**', {
        url: '/upgrade/:upgradeType',
        lazyLoad: ($transition$) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

          return import('./upgrade.module').then((mod) =>
            $ocLazyLoad.inject(mod.default || mod),
          );
        },
      });
    },
  )
  .run(/* @ngTranslationsInject ./translations */);

export default moduleName;
