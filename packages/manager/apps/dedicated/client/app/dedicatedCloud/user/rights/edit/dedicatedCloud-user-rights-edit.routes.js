export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.dedicatedCloud.details.users.rights.edit', {
    url: '/edit',
    params: {
      rightId: null,
      user: null,
    },
    views: {
      modal: {
        component: 'dedicatedCloudUserRightsEdit',
      },
    },
    layout: 'modal',
    resolve: {
      goBack: /* @ngInject */ (goBackToState) => (
        message = false,
        type = 'success',
      ) => {
        return goBackToState(
          'app.dedicatedCloud.details.users.rights',
          message,
          type,
        );
      },
      rightId: /* @ngInject */ ($transition$) => $transition$.params().rightId,
      user: /* @ngInject */ (DedicatedCloud, productId, userId) =>
        DedicatedCloud.getUserDetail(productId, userId),
    },
  });
};
