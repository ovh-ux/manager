import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'prerouteB';

angular.module(moduleName, ['ui.router', 'oc.lazyLoad']).config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state('routeA.routeB.**', {
      url: '/routeB',
      lazyLoad: ($transition$) => {
        return import('./routeB.module').then((mod) => {
          const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
          return $ocLazyLoad.inject(mod.default || mod);
        });
      },
    });
  },
);
export default moduleName;
