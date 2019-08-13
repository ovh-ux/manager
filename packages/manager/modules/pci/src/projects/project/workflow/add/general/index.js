import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-ui-angular';

import component from './general.component';

const moduleName = 'ovhManagerPciWorkflowCreateGeneralModule';

angular
  .module(moduleName, [
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('pciProjectsProjectWorkflowGeneralInfo', component);

export default moduleName;
