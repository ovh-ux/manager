import controller from './controller';
import template from './template.html';

const component = {
  bindings: {
    cluster: '<',
    guideUrl: '<',
  },
  template,
  controller,
};

export default component;
