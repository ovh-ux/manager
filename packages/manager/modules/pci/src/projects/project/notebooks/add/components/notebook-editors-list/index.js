import angular from 'angular';
import 'angular-translate';
import '@ovh-ux/ui-kit';

import component from './notebook-editors-list.component';

const moduleName = 'ovhManagerPciProjectNotebooksNotebookEditors';

angular
  .module(moduleName, ['oui', 'pascalprecht.translate'])
  .component('notebookEditorsList', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
