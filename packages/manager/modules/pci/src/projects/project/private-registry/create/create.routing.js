import map from 'lodash/map';
import find from 'lodash/find';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.private-registry.create', {
    url: '/create',
    component: 'pciProjectPrivateRegistryCreate',
    resolve: {
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate('private_registry_create'),

      capabilities: /* @ngInject */ (pciPrivateRegistryService, projectId) =>
        pciPrivateRegistryService.getCapabilities(projectId),
      availableRegions: /* @ngInject */ (capabilities) =>
        map(capabilities, (capability) => ({
          name: capability.regionName,
          hasEnoughQuota: () => true,
        })),

      plans: /* @ngInject */ (capabilities) => (regionName) => {
        const { plans } = find(capabilities, { regionName });
        return plans;
      },

      getCredentialsLink: /* @ngInject */ ($state, projectId) => (registryId) =>
        $state.href('pci.projects.project.private-registry.credentials', {
          projectId,
          registryId,
          confirmationRequired: true,
        }),

      goBack: /* @ngInject */ (goBackToList) => goBackToList,
    },
  });
};
