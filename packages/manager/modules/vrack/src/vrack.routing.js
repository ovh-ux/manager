import { ListLayoutHelper } from '@ovh-ux/manager-ng-layout-helpers';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('vrack-home', {
    url: `/vrack?${ListLayoutHelper.urlQueryParams}`,
    component: 'managerListLayout',
    params: ListLayoutHelper.stateParams,
    resolve: {
      ...ListLayoutHelper.stateResolves,
      apiPath: /* @ngInject */ () => '/vrack',
      dataModel: () => 'vrack.vrack',
      resources: /* @ngInject */ ($http) =>
        $http
          .get('/vracks', {
            serviceType: 'aapi',
          })
          .then(({ data }) => data),

      loadResource: /* @ngInject */ () => (service) => ({
        ...service,
        serviceName: service.id,
      }),
      staticResources: () => true,
      defaultFilterColumn: () => 'serviceName',
      header: /* @ngInject */ ($translate) => $translate.instant('vrack_title'),
      customizableColumns: () => true,
      getServiceNameLink: /* @ngInject */ ($state) => ({
        serviceName: vrackId,
      }) =>
        $state.href('vrack', {
          vrackId,
        }),
    },
  });
};
