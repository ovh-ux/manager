import angular from 'angular';
import ngOvhTelecomUniverseComponents from '@ovh-ux/ng-ovh-telecom-universe-components';
import '@uirouter/angularjs';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-api-services';

import controller from './ports.controller';
import factory from './ports.factory';
import template from './ports.html';

const moduleName = 'XdslModemPorts';

angular
  .module(moduleName, [
    ngOvhTelecomUniverseComponents,
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'ovh-api-services',
    'ui.router',
  ])
  .controller('XdslModemPortsCtrl', controller)
  .factory('PackXdslModemLanObject', factory)
  .run(/* @ngTranslationsInject:json ./translations */)
  .run(
    /* @ngInject */ ($templateCache) => {
      $templateCache.put(
        'app/telecom/pack/xdsl/modem/router/ports/pack-xdsl-modem-ports.html',
        template,
      );
    },
  );

export default moduleName;
