export default /* @ngInject */ ($stateProvider) =>
  $stateProvider.state('pci.projects.project.data-processing.submit-job', {
    url: '/submit-job',
    component: 'pciProjectDataProcessingSubmitJob',
    resolve: {
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('data_processing_submit_job_title'),
      capabilities: /* @ngInject */ (dataProcessingService, projectId) =>
        dataProcessingService.getCapabilities(projectId),
      goBack: /* @ngInject */ (showJobs) => showJobs,
    },
  });
