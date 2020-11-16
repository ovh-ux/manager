export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.dedicatedCloud.details.datacenter.add-datacenter', {
    url: '/add-datacenter',
    views: {
      modal: {
        component: 'ovhManagerDedicatedCloudDatacenterAdd',
      },
    },
    layout: 'modal',
    resolve: {
      goBack: /* @ngInject */ ($state, $timeout, productId, setMessage) => (
        message = false,
        type = 'success',
      ) => {
        const reload = message && type === 'success';

        const promise = $state.go(
          'app.dedicatedCloud.details.datacenter',
          { productId },
          {
            reload,
          },
        );

        if (message) {
          promise.then(() => $timeout(() => setMessage(message, type)));
        }

        return promise;
      },
    },
  });
};
