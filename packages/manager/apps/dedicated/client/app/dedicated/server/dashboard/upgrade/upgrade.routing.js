import find from 'lodash/find';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.dedicated-server.server.dashboard.upgrade', {
    url: '/upgrade/:upgradeType',
    views: {
      'dashboard@app.dedicated-server.server.dashboard': {
        component: 'dedicatedServerUpgrade',
      },
    },
    resolve: {
      breadcrumb: () => null,
      getRenewDetails: () => (option) =>
        find(option.prices, (price) => price.capacities?.includes('renew')),
      getOptionPrice: /* @ngInject */ (getRenewDetails) => (option) =>
        getRenewDetails(option)?.price,
      goBack: /* @ngInject */ ($state) => () => $state.go('^'),
      options: /* @ngInject */ (
        getOptionPrice,
        technicalDetails,
        upgradeType,
      ) =>
        [
          ...(upgradeType === 'ram'
            ? technicalDetails.memory?.upgradable
            : technicalDetails.storage?.upgradable),
        ].sort(
          (option1, option2) =>
            getOptionPrice(option1)?.value - getOptionPrice(option2)?.value,
        ),
      optionId: /* @ngInject */ (technicalDetails, upgradeType) =>
        upgradeType === 'ram'
          ? technicalDetails.memory?.serviceId
          : technicalDetails.storage?.serviceId,
      upgradeType: /* @ngInject */ ($transition$) =>
        $transition$.params().upgradeType,
    },
  });
};
