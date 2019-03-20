import angular from 'angular';

import controller from './modal-controller';

const moduleName = 'ovhManagerKubernetesServiceUpdate';

angular.module(moduleName, [])
  .config(/* @ngInject */ ($stateProvider) => {
    $stateProvider
      .state('kube.service.update', {
        url: '/update',
        views: {
          kubernetesPopUpView: {
            controller,
            controllerAs: '$ctrl',
          },
        },
      });
  })
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
