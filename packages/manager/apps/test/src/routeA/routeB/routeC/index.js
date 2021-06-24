import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'prerouteC';

angular.module(moduleName, ['ui.router', 'oc.lazyLoad']).config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state('routeA.routeB.routeC.**', {
      url: '/routeC',
      lazyLoad: ($transition$) => {
        return import('./routeC.module').then((mod) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
          return $ocLazyLoad.inject(mod.default || mod);
        });
      },
    });
  },
);
export default moduleName;
