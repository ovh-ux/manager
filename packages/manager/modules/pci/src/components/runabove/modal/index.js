import angular from 'angular';

import directive from './directive';
import service from './service';

const moduleName = 'ovhManagerPciComponentsRunaboveModal';

angular
  .module(moduleName, [])
  .directive('raModal', directive)
  .service('RAModalService', service);

export default moduleName;
