import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'ovhManagerPciProjectServingNamespaceTokensAddLazyloading';

angular
  .module(moduleName, [
    'ui.router',
    'oc.lazyLoad',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('pci.projects.project.serving.namespace.tokens.add.**', {
      url: '/add',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./add.module')
          .then(mod => $ocLazyLoad.inject(mod.default || mod));
      },
    });
  });

export default moduleName;
