import controller from './quota.controller';
import template from './quota.html';

export default {
  bindings: {
    hasDefaultPaymentMethod: '<',
    guideUrl: '<',
    project: '<',
    projectId: '<',
    quotas: '<',
    region: '<',
    increaseQuotaLink: '<',
    getStateName: '<',
    goToRegion: '<',
  },
  controller,
  template,
};
