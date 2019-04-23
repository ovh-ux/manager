import angular from 'angular';

import '@ovh-ux/ng-translate-async-loader';
import '@ovh-ux/manager-core';
import 'ovh-api-services';
import 'ovh-ui-angular';

import assistanceMenu from './assistance-menu';
import languageMenu from './language-menu';
import notificationsMenu from './notifications-menu';
import userMenu from './user-menu';

import navbarComponent from './component';
import service from './service';

import 'ovh-ui-kit/dist/oui.css';

const moduleName = 'ovhManagerNavbar';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'ovhManagerCore',
    'ovh-api-services',
    'oui',
    assistanceMenu,
    languageMenu,
    notificationsMenu,
    userMenu,
  ])
  .component('ovhManagerNavbar', navbarComponent)
  .service('Navbar', service)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
