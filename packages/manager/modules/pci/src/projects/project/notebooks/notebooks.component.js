import controller from './notebooks.controller';
import template from './notebooks.html';

export default {
  bindings: {
    projectId: '<',
    goToAddNotebook: '<',
    goToNotebook: '<',
    goToAttachData: '<',
    goToDeleteNotebook: '<',
    reloadState: '<',
    guideUrl: '<',
    notebookLink: '<',
    notebooks: '<',
    startNotebook: '<',
    stopNotebook: '<',
    pollNotebookStatus: '<',
    stopPollingNotebookStatus: '<',
    trackNotebooks: '<',
    trackClick: '<',
  },
  controller,
  template,
};
