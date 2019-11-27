angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.packs.pack.xdsl.modem.dmz', {
    url: '/dmz',
    views: {
      'modemView@telecom.packs.pack.xdsl.modem': {
        templateUrl: 'app/telecom/pack/xdsl/modem/dmz/pack-xdsl-modem-dmz.html',
        controller: 'XdslModemDmzCtrl',
        controllerAs: 'DmzCtrl',
      },
    },
    translations: { value: ['.'], format: 'json' },
  });
});
