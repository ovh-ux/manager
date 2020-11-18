import template from './cancel.html';
import controller from './cancel.controller';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.dashboard.terminate.cancel',
    {
      url: '/cancel',
      views: {
        'lineView@telecom.telephony.billingAccount.line.dashboard': {
          template,
          controller,
          controllerAs: 'TerminateCancelCtrl',
        },
      },
    },
  );
};
