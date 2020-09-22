import template from './GENERAL_INFORMATIONS.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.hosting.dashboard.information', {
    url: '',
    controller: 'hostingGeneralInformationsCtrl',
    template,
    resolve: {
      breadcrumb: () => null,
    },
  });
};
