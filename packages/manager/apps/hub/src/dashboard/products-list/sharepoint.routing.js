import pick from 'lodash/pick';

import { ListLayoutHelper } from '@ovh-ux/manager-ng-layout-helpers';
import { urlQueryParams, params, component, resolves } from './config';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.dashboard.ms_services_sharepoint', {
    url: `ms_services_sharepoint?${urlQueryParams}`,
    params,
    component,
    resolve: {
      ...resolves,
      ...pick(ListLayoutHelper.stateResolves, ['onListParamsChange', 'filter']),
      productType: () => 'MS_SERVICES_SHAREPOINT',
      apiPath: () => '/msServices',
      resourcePath: () => '/msServices/{serviceName}/sharepoint',
      schema: /* @ngInject */ ($http, apiPath) =>
        $http.get(`${apiPath}.json`).then(({ data }) => data),
      rows: /* @ngInject */ ($http) =>
        $http
          .get('/sharepoints', {
            serviceType: 'aapi',
          })
          .then(({ data }) => data),
      paginationNumber: /* @ngInject */ ($transition$) =>
        $transition$.paramsChanged().filter &&
        !$transition$.paramsChanged().page
          ? 1
          : $transition$.params().page,
      paginationSize: /* @ngInject */ ($transition$) =>
        $transition$.params().pageSize,
      paginationTotalCount: /* @ngInject */ (rows) => rows.length,
    },
  });
};
