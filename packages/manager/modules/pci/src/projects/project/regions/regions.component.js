import controller from './regions.controller';
import template from './regions.html';

export default {
  bindings: {
    availableRegions: '<',
    guideUrl: '<',
    projectId: '<',
    regions: '<',
  },
  controller,
  template,
};
