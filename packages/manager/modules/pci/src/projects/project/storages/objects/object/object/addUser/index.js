import angular from 'angular';
import '@ovh-ux/manager-core';
import '@uirouter/angularjs';
import '@ovh-ux/ui-kit';

import containers from '../../../../containers';
import routing from './addUser.routing';

const moduleName = 'ovhManagerPciStoragesObjectsObjectObjectAddUser';

angular
  .module(moduleName, [containers, 'oui', 'ovhManagerCore', 'ui.router'])
  .config(routing);

export default moduleName;
