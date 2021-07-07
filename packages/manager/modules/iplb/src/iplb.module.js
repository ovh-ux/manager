import angular from 'angular';
import 'angular-translate';
import '@ovh-ux/ui-kit';
import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import { ListLayoutHelper } from '@ovh-ux/manager-ng-layout-helpers';
import { region } from '@ovh-ux/manager-components';

import routing from './iplb.routing';

const moduleName = 'ovhManagerIpLoadBalancer';

angular
  .module(moduleName, [
    ngTranslateAsyncLoader,
    'oui',
    'pascalprecht.translate',
    ListLayoutHelper.moduleName,
    region,
  ])
  .config(routing);

export default moduleName;
