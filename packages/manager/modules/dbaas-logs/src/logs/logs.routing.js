export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('dbaas-logs', {
    component: 'dbaasLogs',
    url: '/dbaas/logs',
    redirectTo: 'dbaas-logs.list',
    translations: {
      value: ['.'],
      format: 'json',
    },
  });
};
