import template from './dashboard.html';

export default {
  bindings: {
    bills: '<',
    feedbackUrl: '<',
    me: '<',
    billingServices: '<',
    expand: '<',
    expandProducts: '<',
    goToProductPage: '<',
    notifications: '<',
    order: '<',
    products: '<',
    refresh: '<',
    refreshBillingServices: '<',
    refreshOrder: '<',
    services: '<',
    trackingPrefix: '<',
  },
  template,
};
