export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.training.jobs', {
    url: '/jobs',
    component: 'pciProjectTrainingJobsComponent',
    resolve: {
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('pci_projects_project_training_jobs_title'),
      pricesCatalog: /* @ngInject */ (PciProjectTrainingService, projectId) =>
        PciProjectTrainingService.getPricesFromCatalog(projectId),
      getCatalogEntryF: /* @ngInject */ (pricesCatalog) => {
        return function f(resourceId) {
          let catalogEntry;
          if (resourceId === 'gpu') {
            // catalogEntry =
            //   pricesCatalog[`ai-training.ai1-1-gpu.hour.consumption`];
            catalogEntry =
              pricesCatalog[`ai-training.ai1-standard.hour.consumption`];
          } else {
            // catalogEntry =
            //   pricesCatalog[`ai-training.ai1-standard.hour.consumption`];
            catalogEntry =
              pricesCatalog[`ai-training.ai1-standard.hour.consumption`];
          }
          return catalogEntry;
        };
      },
      getPrice: /* @ngInject */ (getCatalogEntryF) => (qty, resourceId) => {
        return getCatalogEntryF(resourceId).priceInUcents * qty;
      },
      getTax: /* @ngInject */ (getCatalogEntryF) => (qty, resourceId) =>
        getCatalogEntryF(resourceId).tax * qty,
      job: /* @ngInject */ (PciProjectTrainingJobService, projectId) => (
        jobId,
      ) => PciProjectTrainingJobService.get(projectId, jobId),
      goToJobs: ($state, CucCloudMessage, projectId) => (
        message = false,
        type = 'success',
      ) => {
        const reload = message && type === 'success';

        const promise = $state.go(
          'pci.projects.project.training.jobs',
          {
            projectId,
          },
          {
            reload,
          },
        );

        if (message) {
          promise.then(() =>
            CucCloudMessage[type](
              message,
              'pci.projects.project.training.jobs',
            ),
          );
        }

        return promise;
      },
    },
  });
};
