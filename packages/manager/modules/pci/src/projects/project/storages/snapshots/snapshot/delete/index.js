import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'ovhManagerPciStoragesSnapshotsSnapshotDeleteLazyLoading';

angular
  .module(moduleName, [
    'ui.router',
    'oc.lazyLoad',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('pci.projects.project.storages.snapshots.delete.**', {
      url: '/delete',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./delete.module')
          .then(mod => $ocLazyLoad.inject(mod.default || mod));
      },
    });
  });

export default moduleName;
