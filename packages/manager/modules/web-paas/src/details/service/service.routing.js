export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('web-paas.dashboard.service', {
    url: '/service',
    views: {
      projectView: 'webPaasDetailsService',
    },
    resolve: {
      terminateProject: /* @ngInject */ ($state, projectId) => () =>
        $state.go('web-paas.dashboard.service.cancel', {
          projectId,
        }),
      goToAddAddon: /* @ngInject */ ($state, projectId) => (addonType) =>
        $state.go('web-paas.dashboard.service.add-addon', {
          projectId,
          addonType,
        }),
      goToEditPlan: /* @ngInject */ ($state, projectId) => (cpu) =>
        $state.go('web-paas.dashboard.service.edit-range', {
          projectId,
          cpu,
        }),
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('web_paas_general_info'),
    },
  });
};
