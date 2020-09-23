import template from './email-domain-delegate-filter.html';

export default /* @ngInject */ ($stateProvider) =>
  $stateProvider.state('app.email-delegate.dashboard.account.filter', {
    url: '/filter',
    template,
    controller: 'EmailDelegateFilterCtrl',
    controllerAs: 'ctrlEmailDelegateFilter',
    params: {
      email: {},
      emails: [],
    },
    resolve: {
      email: /* @ngInject */ ($transition$) => $transition$.params().email,
      emails: /* @ngInject */ ($transition$) => $transition$.params().emails,
    },
  });
