export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.serving.namespace.models.add', {
    url: '/add',
    views: {
      'content@pci.projects.project.serving.namespace':
        'ovhManagerPciProjectServingNamespaceModelsAddComponent',
    },
    resolve: {
      goBack: /* @ngInject */ (goToNamespaceModels) => goToNamespaceModels,
      flavors: /* @ngInject */ (
        OvhManagerPciServingNamespaceModelsAddServiceCapabilities,
        projectId,
      ) =>
        OvhManagerPciServingNamespaceModelsAddServiceCapabilities.getFlavors(
          projectId,
        ),
      presetImages: /* @ngInject */ (
        OvhManagerPciServingNamespaceModelsAddServiceCapabilities,
        projectId,
      ) =>
        OvhManagerPciServingNamespaceModelsAddServiceCapabilities.getPresetImages(
          projectId,
        ),
      goToContainer: /* @ngInject */ ($state, projectId, namespace) => () =>
        $state.go('pci.projects.project.storages.objects.object', {
          projectId,
          containerId: namespace.containerId,
        }),
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('pci_projects_project_serving_namespace_models_add'),
    },
  });
};
