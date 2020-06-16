export default {
  url: '/dns-anycast',
  views: {
    domainView: {
      component: 'domainAnycast',
    },
  },
  resolve: {
    getDnsAnycast: /* @ngInject */ (Domain, domainName) =>
      Domain.getDetails(domainName, ['dnsanycast']).then(
        (res) => res.dnsanycast,
      ),
    previousState: /* @ngInject */ ($transition$) => $transition$.$from(),
    goBack: /* @ngInject */ ($state, previousState) => () => {
      if (previousState.name) {
        $state.go(previousState.name);
      } else {
        $state.go('^');
      }
    },
  },
};
