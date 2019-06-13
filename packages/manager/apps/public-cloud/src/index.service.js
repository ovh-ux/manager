import sortBy from 'lodash/sortBy';

import { DEFAULT_PROJECT_KEY } from './index.constants';

export default class PublicCloud {
  /* @ngInject */
  constructor(coreConfig, iceberg, OvhApiCloudProject, ovhUserPref) {
    this.coreConfig = coreConfig;
    this.iceberg = iceberg;
    this.OvhApiCloudProject = OvhApiCloudProject;
    this.ovhUserPref = ovhUserPref;
  }

  getProjects(filters = []) {
    // Don't have Iceberg in US -> Fallback by ovh-api-services
    if (this.coreConfig.isRegion('US')) {
      this.OvhApiCloudProject.v6().resetAllCache();
      return this.OvhApiCloudProject
        .v6()
        .queryDetails()
        .then(projects => sortBy(projects, 'description'));
    }

    // Use Iceberg
    return filters.reduce(
      (promise, {
        field,
        comparator,
        reference,
      }) => promise.addFilter(field, comparator, reference),
      this
        .iceberg('/cloud/project')
        .query()
        .expand('CachedObjectList-Cursor'),
    )
      .sort('description') // Doesn't work as long as cache is not enabled
      .execute(null, true)
      .$promise;
  }

  handleDefaultProject() {
    return this.getProjects([{
      field: 'status',
      comparator: 'in',
      reference: ['creating', 'ok'],
    }])
      .then((projects) => {
        if (projects.length > 0) {
          return this.ovhUserPref
            .getValue(DEFAULT_PROJECT_KEY)
            .then(({ projectId }) => ({
              state: 'pci.projects.project',
              params: {
                projectId,
              },
            }))
            .catch((error) => {
              if (error.status === 404) {
              // No project is defined as favorite
              // Go on the first one :)
                return {
                  state: 'pci.projects.project',
                  params: {
                    projectId: projects[0].project_id,
                  },
                };
              }
              return Promise.reject(error);
            });
        }
        return { state: 'pci.projects.onboarding' };
      });
  }
}
