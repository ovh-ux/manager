import clone from 'lodash/clone';
import template from './emailpro-task.html';

const state = {
  url: '/task',
  template,
  controller: 'EmailProTabTasksCtrl',
};

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('email-pro.dashboard.task', clone(state));
  $stateProvider.state('mxplan.dashboard.task', clone(state));
};
