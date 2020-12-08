import template from './billing-main-history-debt-pay.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('billing.main.history.pay-debt', {
    url: '/debt/:debtId/pay',
    views: {
      modal: {
        template,
        controller: 'BillingHistoryDebtPayCtrl',
      },
    },
    layout: {
      name: 'modal',
      redirectTo: 'billing.main.history',
    },
    translations: { value: ['.'], format: 'json' },
  });
};
