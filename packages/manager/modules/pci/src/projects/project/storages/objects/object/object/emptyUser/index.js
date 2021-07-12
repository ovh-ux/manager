import angular from 'angular';
import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import '@ovh-ux/ui-kit';

import containers from '../../../../containers';
import routing from './emptyUser.routing';

const moduleName = 'ovhManagerPciStoragesObjectsObjectObjectEmptyUser';

angular
  .module(moduleName, [containers, 'oui', 'ovhManagerCore', 'ui.router'])
  .config(routing);

export default moduleName;
