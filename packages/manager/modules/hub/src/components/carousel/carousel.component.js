import controller from './carousel.controller';
import template from './carousel.html';

export default {
  bindings: {
    items: '<',
    trackingPrefix: '@',
  },
  controller,
  template,
};
