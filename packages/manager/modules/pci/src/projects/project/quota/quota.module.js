import angular from 'angular';
import 'angular-translate';

import '@ovh-ux/manager-core';
import '@ovh-ux/ng-ovh-cloud-universe-components';
import '@ovh-ux/ng-ovh-api-wrappers'; // should be a peer dependency of ovh-api-services
import '@ovh-ux/ng-translate-async-loader';
import 'ovh-api-services';
import 'ovh-ui-angular';

import header from '../../../components/project/quota-region-header';
import component from './quota.component';
import routing from './quota.routing';
import service from './quota.service';

const moduleName = 'ovhManagerPciProjectQuota';

angular
  .module(moduleName, [
    header,
    'ovhManagerCore',
    'ngOvhCloudUniverseComponents',
    'ngTranslateAsyncLoader',
    'oui',
    'ovhManagerCore',
    'ovh-api-services',
    'pascalprecht.translate',
  ])
  .component('pciProjectQuota', component)
  .service('PciProjectQuota', service)
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
