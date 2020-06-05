import set from 'lodash/set';
import controller from './dns-zone.controller';
import template from './dns-zone.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.domain.dns-zone', {
    url: '/configuration/zone/:productId',
    controller,
    controllerAs: 'ctrlDomain',
    template,
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      capabilities: /* @ngInject */ (DNSZoneService, serviceName) =>
        DNSZoneService.getCapabilities(serviceName),
      contactManagementLink: /* @ngInject */ (
        RedirectionService,
        serviceName,
      ) => RedirectionService.getURL('contactManagement', { serviceName }),
      currentSection: () => 'zone',
      navigationInformations: /* @ngInject */ (
        currentSection,
        Navigator,
        $rootScope,
      ) => {
        set($rootScope, 'currentSectionInformation', currentSection);
        return Navigator.setNavigationInformation({
          leftMenuVisible: true,
          configurationSelected: true,
        });
      },
      serviceName: /* @ngInject */ ($transition$) =>
        $transition$.params().productId,
    },
    redirectTo: 'app.domain.dns-zone.dashboard',
    translations: { value: ['../domain'], format: 'json' },
  });
};
