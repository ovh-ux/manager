import angular from 'angular';

import component from './overTheBox-docs.component';
import routing from './overTheBox-docs.routing';

const moduleName = 'ovhManagerOtbDocs';

angular
  .module(moduleName, [])
  .component('overTheBoxDocs', component)
  .config(routing);

export default moduleName;
