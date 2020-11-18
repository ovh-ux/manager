import template from './default-voicemail.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.answer.defaultVoicemail',
    {
      url: '/defaultVoicemail',
      views: {
        'lineView@telecom.telephony.billingAccount.line': {
          template,
          noTranslations: true,
        },
        'voicemailView@telecom.telephony.billingAccount.line.answer.defaultVoicemail': {
          templateUrl:
            'app/telecom/telephony/service/voicemail/default/default.html',
          controller: 'TelecomTelephonyServiceVoicemailDefaultCtrl',
          controllerAs: 'DefaultVoicemailCtrl',
        },
      },
    },
  );
};
