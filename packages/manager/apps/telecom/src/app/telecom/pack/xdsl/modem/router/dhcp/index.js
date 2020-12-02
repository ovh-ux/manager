import angular from 'angular';
import ngOvhTelecomUniverseComponents from '@ovh-ux/ng-ovh-telecom-universe-components';
import '@uirouter/angularjs';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-api-services';

import controller from './dhcp.controller';
import factory from './dhcp.factory';
import template from './dhcp.html';

import controllerModal from './dhcp-modal.component';
import templateModal from './dhcp-modal.html';

const moduleName = 'XdslModemDhcp';

angular
  .module(moduleName, [
    ngOvhTelecomUniverseComponents,
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'ovh-api-services',
    'ui.router',
  ])
  .controller('XdslModemDhcpCtrl', controller)
  .controller('telecomXdslModemDhcpModal', controllerModal)
  .factory('telecomXdslModemDhcpModal', factory)
  .run(/* @ngTranslationsInject:json ./translations */)
  .run(
    /* @ngInject */ ($templateCache) => {
      $templateCache.put(
        'app/telecom/pack/xdsl/modem/router/dhcp/pack-xdsl-modem-dhcp.html',
        template,
      );
      $templateCache.put(
        'app/telecom/pack/xdsl/modem/router/dhcp/pack-xdsl-modem-dhcp-modal.html',
        templateModal,
      );
    },
  );

export default moduleName;
