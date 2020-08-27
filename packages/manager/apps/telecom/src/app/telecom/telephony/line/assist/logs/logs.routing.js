export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.dashboard.assist.logs',
    {
      url: '/logs',
      views: {
        'lineView@telecom.telephony.billingAccount.line.dashboard': {
          templateUrl: 'app/telecom/telephony/service/assist/logs/logs.html',
          controller: 'TelecomTelephonyServiceAssistLogsCtrl',
          controllerAs: 'LogsCtrl',
        },
      },
    },
  );
};
