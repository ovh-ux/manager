import angular from 'angular';
import routeC from './routeC';

const moduleName = 'routeB';

angular.module(moduleName, [routeC]).config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state('routeA.routeB', {
      url: '/routeB',
      template: '<div ui-view></div> :: ROUTE B',
    });
  },
);

export default moduleName;
