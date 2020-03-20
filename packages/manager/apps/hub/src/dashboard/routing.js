import filter from 'lodash/filter';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';

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
      products: /* @ngInject */ (catalog, order, services) =>
        get(services, 'data.count') === 0 && !order
          ? groupBy(
              filter(catalog.data, ({ highlight }) => highlight),
              'universe',
            )
          : reverse(
              sortBy(
                map(services.data.data, (service, productType) => ({
                  ...service,
                  productType,
                })),
                'count',
              ),
            ),

      goToProductPage: /* @ngInject */ ($state, atInternet, trackingPrefix) => (
        product,
      ) => {
        atInternet.trackClick({
          name: `${trackingPrefix}::product::${product}::show-all`,
          type: 'action',
        });
        return $state.go(`app.dashboard.${product.toLowerCase()}`);
      },
      trackingPrefix: () => 'hub::dashboard',
      expandProducts: /* @ngInject */ ($state) => (expand) =>
        $state.go('.', {
          expand,
        }),
      expand: /* @ngInject */ ($transition$) => $transition$.params().expand,
      hideBreadcrumb: () => true,
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('manager_hub_dashboard'),
    },
    componentProvider: /* @ngInject */ (order, services) =>
      get(services, 'data.count') === 0 && !order
        ? 'hubOrderDashboard'
        : 'hubDashboard',
  });

  $urlRouterProvider.otherwise('/');
};
