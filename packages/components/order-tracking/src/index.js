import angular from 'angular';
import component from './order-tracking.component';

const moduleName = 'orderTracking';
const componentName = 'orderTrackingComponent';

angular
  .module(moduleName, [])
  .component(componentName, component)
  .run(/* @ngTranslationsInject:json ./translations */);

export {
  moduleName as module,
  componentName as component,
};
