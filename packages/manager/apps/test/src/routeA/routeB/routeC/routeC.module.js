import angular from 'angular';

const moduleName = 'routeC';

angular.module(moduleName, []).config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state('routeA.routeB.routeC', {
      url: '/routeC',
      template: '<div ui-view></div> :: ROUTE C',
    });
  },
);

export default moduleName;
