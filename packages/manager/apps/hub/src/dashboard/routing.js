import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

export default /* @ngInject */ ($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('app.dashboard', {
    url: '/?expand',
    params: {
      expand: {
        value: null,
        squash: true,
        dynamic: true,
      },
    },
    resolve: {
      products: /* @ngInject */ (catalog, services) =>
        services.count === 0
          ? groupBy(
              filter(catalog.data, ({ highlight }) => highlight),
              'universe',
            )
          : map(services.data, (service, productType) => ({
              ...service,
              productType,
            })),

      goToProductPage: /* @ngInject */ ($state) => (product) =>
        product.includes('EXCHANGE')
          ? $state.go('app.dashboard.exchange')
          : $state.go('app.dashboard.products', {
              product: product.toLowerCase(),
            }),
      trackingPrefix: () => 'hub::dashboard',
      expandProducts: /* @ngInject */ ($state) => (expand) =>
        $state.go('.', {
          expand,
        }),
      expand: /* @ngInject */ ($transition$) => $transition$.params().expand,
    },
    componentProvider: /* @ngInject */ (services) =>
      services.count === 0 ? 'hubOrderDashboard' : 'hubDashboard',
  });

  $urlRouterProvider.otherwise('/');
};
