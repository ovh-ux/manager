import template from './private-database-database.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.private-database.dashboard.database', {
    url: '/database',
    template,
    controller: 'PrivateDatabaseBDDsCtrl',
    redirectTo: 'app.private-database.dashboard.database.list',
    resolve: {
      goToDatabases: /* @ngInject */ ($state) => () =>
        $state.go('app.private-database.dashboard.database.list'),
      goToDumps: /* @ngInject */ ($state) => () =>
        $state.go('app.private-database.dashboard.database.dump'),
      goToExtensions: /* @ngInject */ ($state) => () =>
        $state.go('app.private-database.dashboard.database.extension'),
      goToArchives: /* @ngInject */ ($state) => () =>
        $state.go('app.private-database.dashboard.database.archive.list'),
      goToArchivesDump: /* @ngInject */ ($state) => () =>
        $state.go('app.private-database.dashboard.database.archive.dump'),
      goToUsers: /* @ngInject */ ($state) => () =>
        $state.go('app.private-database.dashboard.database.user'),
    },
  });
};
