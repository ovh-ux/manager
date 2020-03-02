export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.dedicatedClouds.datacenter.backup', {
    url: '/backup',
    views: {
      pccDatacenterView: {
        component: 'ovhManagerDedicatedCloudBackup',
      },
    },
    redirectTo: (transition) =>
      Promise.all([
        transition.injector().getAsync('licence'),
        transition.injector().getAsync('backup'),
      ]).then(([licence, backup]) => {
        if (!licence.isSplaActive) {
          return {
            state: 'app.dedicatedClouds.datacenter.backup.spla-licence',
          };
        }
        if (backup.isInactive()) {
          return { state: 'app.dedicatedClouds.datacenter.backup.new' };
        }
        if (backup.isLegacy()) {
          return {
            state: 'app.dedicatedClouds.datacenter.backup.legacy',
          };
        }
        return false;
      }),
    resolve: {
      productId: /* @ngInject */ ($transition$) =>
        $transition$.params().productId,
      datacenterId: /* @ngInject */ ($transition$) =>
        $transition$.params().datacenterId,
      backup: /* @ngInject */ (
        datacenterBackupService,
        productId,
        datacenterId,
      ) => datacenterBackupService.getBackup(productId, datacenterId),
      backupOffers: /* @ngInject */ (
        datacenterBackupService,
        productId,
        datacenterId,
        currentUser,
      ) =>
        datacenterBackupService.getBackupOffers(
          productId,
          datacenterId,
          currentUser.ovhSubsidiary,
        ),
      goToNewBackup: /* @ngInject */ ($state, datacenterId, productId) => () =>
        $state.go('app.dedicatedClouds.datacenter.backup.new', {
          datacenterId,
          productId,
        }),
      licence: /* @ngInject */ (currentService, DedicatedCloud, productId) =>
        DedicatedCloud.getDatacenterLicence(
          productId,
          currentService.usesLegacyOrder,
        ),
      goToBackup: ($state, Alerter, datacenterId, productId) => (
        message = false,
        type = 'success',
      ) => {
        const reload = message && type === 'success';
        const promise = $state.go(
          'app.dedicatedClouds.datacenter.backup',
          {
            productId,
            datacenterId,
          },
          {
            reload,
          },
        );

        if (message) {
          promise.then(() =>
            Alerter.set(
              `alert-${type}`,
              message,
              'app.dedicatedClouds.datacenter.backup',
            ),
          );
        }
        return promise;
      },
    },
  });
};
