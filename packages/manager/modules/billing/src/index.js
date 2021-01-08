import angular from 'angular';

import servicesActions from './components/services-actions';
import serviceStatus from './components/service-status';
import subscriptionTile from './components/subscription-tile';
import { RENEW_URL } from './components/services-actions/service-actions.constants';

const moduleName = 'ovhManagerBilling';

angular.module(moduleName, [servicesActions, serviceStatus, subscriptionTile]);

export { RENEW_URL };

export default moduleName;
