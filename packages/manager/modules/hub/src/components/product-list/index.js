import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import ovhManagerCore from '@ovh-ux/manager-core';
import 'angular-translate';
import products from '../products';

import component from './component';

const moduleName = 'ovhManagerHubProductTile';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'oui',
    ovhManagerCore,
    'pascalprecht.translate',
    products,
  ])
  .component('hubProductListing', component);

export default moduleName;
