import angular from 'angular';
import '@ovh-ux/manager-core';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import '@ovh-ux/ui-kit';
import 'ovh-api-services';

import containers from '../../containers/container';
import deleteContainer from './delete';
import addUser from './addUser';
import addObject from './object/add';
import deleteObject from './object/delete';
import routing from './object.routing';
import emptyUser from './emptyUser';
import objectAddUser from './object/addUser';
import objectEmptyUser from './object/emptyUser';

const moduleName = 'ovhManagerPciStoragesObjectsObjectObject';

angular
  .module(moduleName, [
    containers,
    addObject,
    deleteContainer,
    addUser,
    deleteObject,
    emptyUser,
    objectAddUser,
    objectEmptyUser,
    'ngTranslateAsyncLoader',
    'oui',
    'ovh-api-services',
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
