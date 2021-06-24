import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'prerouteA';

angular.module(moduleName, ['ui.router', 'oc.lazyLoad']).config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state('routeA.**', {
      url: '/routeA',
      lazyLoad: ($transition$) => {
        return import('./routeA.module').then((mod) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
          return $ocLazyLoad.inject(mod.default || mod);
        });
      },
    });
  },
);
export default moduleName;
