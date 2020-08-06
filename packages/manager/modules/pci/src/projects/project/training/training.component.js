import controller from './training.controller';
import template from './training.html';

export default {
  controller,
  template,
  bindings: {
    installLink: '<',
    jobInfoLink: '<',
    jobsLink: '<',
    currentActiveLink: '<',
    dataLink: '<',
    allUsers: '<',
    regions: '<',
    refreshState: '<',
    trainingFeatures: '<',
    registry: '<',
    deleteRegistry: '<',
    saveRegistry: '<',
    goToJobSubmit: '<',
    goToDataCreate: '<',
    goToDashboard: '<',
    dashboardLink: '<',
    goToRegistryAttach: '<',
    registryAttachLink: '<',
    goToRegistryDetach: '<',
    registryDetachLink: '<',
    submitJobLink: '<',
    billingLink: '<',
    jobInfo: '<',
    jobKill: '<',
    userLink: '<',
    getPrice: '<',
    getTax: '<',
  },
};
