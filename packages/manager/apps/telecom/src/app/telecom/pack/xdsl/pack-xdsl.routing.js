import head from 'lodash/head';

import template from './pack-xdsl.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.packs.pack.xdsl-redirection', {
    url: '/xdsl/:serviceName',
    resolve: {
      serviceName: /* @ngInject */ ($transition$) =>
        $transition$.params().serviceName,
      lines: /* @ngInject */ (OvhApiXdslLines, serviceName) =>
        OvhApiXdslLines.v6().query({
          xdslId: serviceName,
        }).$promise,
    },
    redirectTo: (transition) =>
      transition
        .injector()
        .getAsync('lines')
        .then((lines) => ({
          state: 'telecom.packs.pack.xdsl',
          params: {
            ...transition.params(),
            number: head(lines),
          },
        })),
  });

  $stateProvider.state('telecom.packs.pack.xdsl', {
    url: '/xdsl/:serviceName/lines/:number',
    views: {
      'packView@telecom.packs': {
        template,
        controller: 'PackXdslCtrl',
        controllerAs: 'PackXdslCtrl',
      },
      'xdslView@telecom.packs.pack.xdsl': 'packXdslAccess',
    },
    translations: {
      value: [
        '../common',
        '.',
        './access',
        './access/comfortExchange',
        './access/deconsolidation',
        './access/statistics',
        './access/ipv6',
        './access/portReset',
        './access/profil',
        './access/rateLimit',
        './access/ip/order',
        './orderFollowUp',
      ],
      format: 'json',
    },
    resolve: {
      $title(translations, $translate, $stateParams, OvhApiXdsl) {
        return OvhApiXdsl.v6()
          .get({
            xdslId: $stateParams.serviceName,
          })
          .$promise.then((data) =>
            $translate.instant(
              'xdsl_page_title',
              { name: data.description || $stateParams.serviceName },
              null,
              null,
              'escape',
            ),
          )
          .catch(() =>
            $translate('xdsl_page_title', { name: $stateParams.serviceName }),
          );
      },
    },
  });
};
