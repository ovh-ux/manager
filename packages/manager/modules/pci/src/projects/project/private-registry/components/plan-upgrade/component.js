import controller from './controller';
import template from './template.html';

export default {
  bindings: {
    cancelLink: '<',
    onError: '&',
    onSuccess: '&',
    plans: '<',
    projectId: '<',
    registryId: '<',
    user: '<',
  },
  controller,
  template,
};
