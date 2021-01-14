import template from './ip-ip.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.ip.dashboard', {
    url: '',
    template,
    controller: 'IpDashboardCtrl',
    reloadOnSearch: false,
    resolve: {
      goToDashboard: /* @ngInject */ ($state) => () =>
        $state.go('app.ip.dashboard'),
      goToAntispam: /* @ngInject */ ($state) => (ip) =>
        $state.go('app.ip.dashboard.ip.antispam', {
          ip: ip.ip,
        }),
      goToFirewall: /* @ngInject */ ($state) => (ip) =>
        $state.go('app.ip.dashboard.ip.firewall', {
          ip: ip.ip,
        }),
      goToGameFirewall: /* @ngInject */ ($state) => (ip) =>
        $state.go('app.ip.dashboard.ip.game-firewall', {
          ip: ip.ip,
        }),
    },
  });

  $stateProvider.state('app.ip.dashboard.ip', {
    url: '/:ip',
    redirectTo: 'app.ip.dashboard',
    resolve: {
      ip: /* @ngInject */ ($transition$) => $transition$.params().ip,
    },
  });
};
