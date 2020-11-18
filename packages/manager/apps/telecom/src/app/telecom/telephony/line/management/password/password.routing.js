import template from './password.html';
import controller from './password.controller';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.dashboard.password',
    {
      url: '/password',
      views: {
        'lineView@telecom.telephony.billingAccount.line.dashboard': {
          template,
          controller,
          controllerAs: 'PasswordCtrl',
        },
      },
    },
  );
};
