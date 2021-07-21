export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'app.dedicatedCloud.details.datacenters.add-datacenter.upgrade-range',
    {
      url: '/upgrade-range/:range?upgradeCode',
      params: {
        upgradeCode: null,
      },
      views: {
        'dedicatedCloudView@app.dedicatedCloud.details':
          'dedicatedCloudUpgradeRange',
      },
      resolve: {
        range: /* @ngInject */ ($transition$) => $transition$.params().range,
        upgradeCode: /* @ngInject */ ($transition$) => {
          return $transition$.params().upgradeCode;
        },
        backButtonText: /* @ngInject */ ($translate) =>
          $translate.instant('dedicated_cloud_upgrade_range'),
        breadcrumb: /* @ngInject */ ($translate) =>
          $translate.instant('dedicated_cloud_upgrade_range'),
      },
    },
  );
};
