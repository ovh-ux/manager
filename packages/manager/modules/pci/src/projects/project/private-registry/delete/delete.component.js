import controller from './delete.controller';
import template from './delete.html';

const component = {
  template,
  controller,
  bindings: {
    goBack: '<',
  },
};

export default component;
