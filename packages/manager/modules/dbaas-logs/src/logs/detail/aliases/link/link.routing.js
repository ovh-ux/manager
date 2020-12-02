export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('dbaas-logs.detail.aliases.home.alias.link', {
    url: '/link',
    params: {
      defaultContent: null,
    },
    views: {
      'logsAliases@dbaas-logs.detail.aliases': 'dbaasLogsDetailAliasesLink',
    },
    resolve: {
    },
  });
};
