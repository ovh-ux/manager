import angular from 'angular';

import uiRouterAngularJs from '@uirouter/angularjs';
import oclazyload from 'oclazyload';

import { state } from './tickets.routing';

const moduleName = 'ovhManagerSupportTicketsLazyLoading';

angular
  .module(moduleName, [
    oclazyload,
    uiRouterAngularJs,
  ])
  .config(/* @ngInject */ ($stateProvider) => {
    $stateProvider.state('support.tickets.**', {
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./tickets.module')
          .then(mod => $ocLazyLoad.inject(mod.default || mod));
      },
      url: state.url,
    });
  });

export default moduleName;
