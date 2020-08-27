import template from './add-user.html';
import controller from './add-user.controller';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.dashboard.calls.click2call.addUser',
    {
      url: '/add',
      views: {
        'lineView@telecom.telephony.billingAccount.line.dashboard': {
          template,
          controller,
          controllerAs: 'Click2CallAddUserCtrl',
        },
      },
    },
  );
};
