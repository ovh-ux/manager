import angular from 'angular';

import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import 'angular-translate';

import '@ovh-ux/ui-kit';
import '@ovh-ux/ui-kit/dist/css/oui.css';
import 'angular-ui-bootstrap';

import routing from './user-infos.routing';
import service from './user-infos.service';

const moduleName = 'ovhManagerDedicatedAccountUserInfos';

angular
  .module(moduleName, [
    'ovhManagerCore',
    'pascalprecht.translate',
    'oui',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
  ])
  .config(routing)
  .service('UserAccountServiceInfos', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
