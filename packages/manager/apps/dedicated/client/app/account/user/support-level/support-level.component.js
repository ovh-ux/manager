import controller from './support-level.controller';
import template from './support-level.html';

export default {
  bindings: {
    currentUser: '<',
    partnerLevel: '<',
    schema: '<',
    supportLevel: '<',
  },
  controller,
  template,
};
