import find from 'lodash/find';
import merge from 'lodash/merge';

import Notebook from './Notebook.class';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.notebooks', {
    url: '/notebooks',
    component: 'ovhManagerPciProjectNotebooks',
    redirectTo: (transition) =>
      Promise.all([
        transition.injector().getAsync('notebooks'),
        transition.injector().getAsync('isAuthorized'),
      ]).then(([notebooks, isAuthorized]) =>
        notebooks.length === 0 || !isAuthorized
          ? { state: 'pci.projects.project.notebooks.onboarding' }
          : false,
      ),
    resolve: {
      isAuthorized: /* @ngInject */ (NotebookService, projectId) =>
        NotebookService.isAuthorized(projectId),

      goToAddNotebook: /* @ngInject */ ($state, projectId) => () =>
        $state.go('pci.projects.project.notebooks.add', { projectId }),

      notebooks: /* @ngInject */ (
        editors,
        frameworks,
        NotebookService,
        projectId,
        coreConfig,
        CucRegionService,
        isAuthorized,
      ) =>
        isAuthorized
          ? NotebookService.getNotebooks(projectId).then((notebooks) =>
              notebooks.map(
                (notebook) =>
                  new Notebook(
                    merge({}, notebook, {
                      spec: {
                        env: {
                          editor: find(editors, {
                            id: notebook.spec.env.editorId,
                          }),
                          framework: find(frameworks, {
                            id: notebook.spec.env.frameworkId,
                          }),
                        },
                      },
                    }),
                    coreConfig,
                    CucRegionService,
                  ),
              ),
            )
          : [],

      editors: /* @ngInject */ (NotebookService, projectId) =>
        NotebookService.getEditors(projectId),

      frameworks: /* @ngInject */ (NotebookService, projectId) =>
        NotebookService.getFrameworks(projectId),

      goToNotebooks: ($state, CucCloudMessage, projectId) => (
        message = false,
        type = 'success',
      ) => {
        const reload = message && type === 'success';
        const state = 'pci.projects.project.notebooks';

        const promise = $state.go(
          state,
          {
            projectId,
          },
          {
            reload,
          },
        );

        if (message) {
          promise.then(() => CucCloudMessage[type](message, state));
        }

        return promise;
      },

      goToNotebook: /* @ngInject */ ($state, CucCloudMessage, projectId) => (
        notebook,
        message = false,
        type = 'success',
      ) => {
        const reload = message && type === 'success';
        const stateName =
          'pci.projects.project.notebooks.dashboard.general-information';

        const promise = $state.go(
          stateName,
          {
            projectId,
            notebookId: notebook.id,
          },
          {
            reload,
          },
        );
        return message
          ? promise.then(() => {
              CucCloudMessage.flushMessages(stateName);
              CucCloudMessage[type](message, stateName);
            })
          : promise;
      },

      goToDeleteNotebook: /* @ngInject */ ($state, projectId) => (notebook) =>
        $state.go('pci.projects.project.notebooks.delete', {
          projectId,
          notebook,
        }),

      goToAttachData: /* @ngInject */ ($state, projectId) => () =>
        $state.go('pci.projects.project.notebooks.dashboard.attach-data', {
          projectId,
        }),

      reloadState: /* @ngInject */ ($state) => () => {
        $state.go($state.current, {}, { reload: true });
      },

      notebookLink: /* @ngInject */ ($state, projectId) => (notebook) =>
        $state.href('pci.projects.project.notebooks.dashboard', {
          projectId,
          notebookId: notebook.id,
        }),

      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('pci_notebook_list_title'),

      notebooksTrackPrefix: () =>
        'PublicCloud::pci::projects::project::ai_machine_learning::notebooks',

      pollNotebookStatus: /* @ngInject */ (
        NotebookService,
        notebooks,
        projectId,
      ) => () => {
        notebooks.forEach((notebook) => {
          if (notebook.isPending()) {
            NotebookService.pollNotebookStatus(
              projectId,
              notebook.id,
            ).then((notebookInfo) => notebook.updateData(notebookInfo));
          }
        });
      },

      stopPollingNotebookStatus: /* @ngInject */ (
        NotebookService,
        notebooks,
        projectId,
      ) => () =>
        notebooks.forEach((notebook) =>
          NotebookService.stopPollingNotebookStatus(projectId, notebook.id),
        ),

      trackNotebooks: /* @ngInject */ (
        notebooksTrackPrefix,
        trackClick,
        trackPage,
      ) => (complement, type = 'action', prefix = true) => {
        const name = `${
          prefix ? `${notebooksTrackPrefix}::` : ''
        }${complement}`;
        switch (type) {
          case 'action':
          case 'navigation':
            trackClick(name, type);
            break;
          case 'page':
            trackPage(name);
            break;
          default:
            trackClick(name);
        }
      },

      trackClick: /* @ngInject */ (atInternet) => (hit, type = 'action') => {
        atInternet.trackClick({
          name: hit,
          type,
        });
      },

      trackPage: /* @ngInject */ (atInternet) => (hit) => {
        atInternet.trackPage({
          name: hit,
        });
      },
    },
  });
};
