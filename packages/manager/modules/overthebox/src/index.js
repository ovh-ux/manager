import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

import '@ovh-ux/manager-core';

import overTheBox from './overthebox';

const moduleName = 'ovhManagerOverTheBoxes';

angular
  .module(moduleName, [
    'ui.router',
    'ovhManagerCore',
    'oc.lazyLoad',
    overTheBox,
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('overTheBoxes', {
      url: '/overTheBox',
      abstract: true,
    });
  });

export default moduleName;
