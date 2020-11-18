import template from './voicemail-password.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.dashboard.answer.voicemailPassword',
    {
      url: '/voicemailPassword',
      views: {
        'lineView@telecom.telephony.billingAccount.line.dashboard': {
          template,
          noTranslations: true,
        },
        'voicemailView@telecom.telephony.billingAccount.line.dashboard.answer.voicemailPassword': {
          templateUrl:
            'app/telecom/telephony/service/voicemail/password/password.html',
          controller: 'TelecomTelephonyServiceVoicemailPasswordCtrl',
          controllerAs: 'VoicemailPasswordCtrl',
        },
      },
    },
  );
};
