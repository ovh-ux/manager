import head from 'lodash/head';

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
      'packView@telecom.packs': 'packXdsl',
      'xdslView@telecom.packs.pack.xdsl': {
        controller: 'XdslAccessCtrl',
        controllerAs: 'XdslAccess',
        templateUrl: 'app/telecom/pack/xdsl/access/pack-xdsl-access.html',
      },
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
      packName: /* @ngInject */ ($transition$) =>
        $transition$.params().packName,
      serviceName: /* @ngInject */ ($transition$) =>
        $transition$.params().serviceName,
      $title($translate, $stateParams, OvhApiXdsl) {
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
      goBack: /* @ngInject */ ($state) => (backState) => {
        $state.go(backState);
      },
    },
  });
};
