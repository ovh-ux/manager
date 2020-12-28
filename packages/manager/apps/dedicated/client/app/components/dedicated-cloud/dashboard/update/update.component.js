import controller from './update.controller';
import template from './update.html';

export default {
  bindings: {
    currentService: '<',
    currentUser: '<',
    goBack: '<',
    operationsUrl: '<',
    targetVersion: '<',
    trackingPrefix: '<',
  },
  controller,
  template,
};
