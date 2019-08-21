import angular from 'angular';

import ovhUxManagerCore from '@ovh-ux/manager-core';
import uiRouterAngularJs from '@uirouter/angularjs';
import oclazyload from 'oclazyload';

import { state } from './support.routing';

const moduleName = 'ovhManagerSupportLazyLoading';

angular
  .module(moduleName, [
    oclazyload,
    ovhUxManagerCore,
    uiRouterAngularJs,
  ])
  .config(/* @ngInject */ ($stateProvider) => {
    $stateProvider.state('support.**', {
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./support.module')
          .then(mod => $ocLazyLoad.inject(mod.default || mod));
      },
      url: state.url,
    });
  })
  .run(/* @ngTranslationsInject:json ./translations */)
  .run(/* @ngInject */ ($transitions, $translate) => {
    $transitions.onBefore({ to: 'support.**' }, () => $translate.refresh());
  });

export default moduleName;
