import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

import './onboarding.less';

const moduleName = 'ovhManagerPciProjectsOnBoardingLazyLoading';

angular
  .module(moduleName, [
    'ui.router',
    'oc.lazyLoad',
  ])
  .config(/* @ngInject */ ($stateProvider) => {
    $stateProvider.state('pci.projects.onboarding.**', {
      url: '/onboarding',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./onboarding.module')
          .then(mod => $ocLazyLoad.inject(mod.default || mod));
      },
    });
  });

export default moduleName;
