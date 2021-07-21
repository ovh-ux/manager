export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'app.dedicatedCloud.details.datacenter.details.datastores.convertToGlobal',
    {
      url: '/convert-to-global',
      params: {
        datastoreId: null,
      },
      views: {
        modal: {
          component: 'ovhManagerDedicatedCloudDatacenterConvertToGlobal',
        },
      },
      layout: 'modal',
      resolve: {
        goBack: /* @ngInject */ (goBackToDatastore) => goBackToDatastore,
        datastoreId: /* @ngInject */ ($transition$) =>
          $transition$.params().datastoreId,
        breadcrumb: () => null,
      },
    },
  );
};
