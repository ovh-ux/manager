import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import '@ovh-ux/ui-kit';

import routing from './cdn-dedicated-ssl-delete.routes';

const moduleName = 'cdnDedicatedManageSslDelete';

angular
  .module(moduleName, [
    uiRouter,
    'ngTranslateAsyncLoader',
    'oui',
    'pascalprecht.translate',
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
