import controller from './config.controller';
import template from './config.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.packs.pack.xdsl.line.modem.wifi', {
    url: '/wifi',
    views: {
      'modemView@telecom.packs.pack.xdsl.line.modem': {
        template,
        controller,
        controllerAs: 'ConfigWifiCtrl',
      },
    },
    params: {
      wifi: null,
    },
  });
};
