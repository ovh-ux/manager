import template from './new.html';
import controller from './new.controller';

export default {
  template,
  controller,
  bindings: {
    getCurrentStep: '<',
    getStepByName: '<',
    getStateLink: '<',
    newProjectInfo: '<',
    onProjectCreated: '<',
    paymentStatus: '<',
    paymentMethodUrl: '<',
    steps: '<',
    dlpStatus: '<',
  },
};
