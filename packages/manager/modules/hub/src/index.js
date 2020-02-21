import angular from 'angular';

import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import 'angular-translate';

import ovhManagerHubTile from './components/tile';
import billingSummary from './components/billing-summary';

const moduleName = 'ovhManagerHub';

angular.module(moduleName, [
  billingSummary,
  'ovhManagerCore',
  'pascalprecht.translate',
  'ui.router',
  ovhManagerHubTile,
]);

export default moduleName;
