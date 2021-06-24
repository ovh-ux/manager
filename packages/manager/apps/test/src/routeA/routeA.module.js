import angular from 'angular';
import routeB from './routeB';

const moduleName = 'routeA';

angular.module(moduleName, [routeB]).config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state('routeA', {
      url: '/routeA',
      template: '<div ui-view></div> :: ROUTE A',
    });
  },
);

export default moduleName;
