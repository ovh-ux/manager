import template from './emailpro-mailing-list-subscribers-view.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('mxplan.dashboard.mailing-list.dashboard.subscribers', {
    url: '/subscribers',
    template,
    controller: 'EmailProMXPlanMailingListsSubscribersCtrl',
    controllerAs: 'ctrlSubscribers',
    params: {
      mailingList: {},
    },
  });
};
