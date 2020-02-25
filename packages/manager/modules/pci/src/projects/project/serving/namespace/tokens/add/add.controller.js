import get from 'lodash/get';
import reduce from 'lodash/reduce';

import { GROUPS } from '../tokens.constants';

export default class PciServingNamespaceTokensAddController {
  /* @ngInject */
  constructor($translate, OvhManagerPciServingTokenService) {
    this.$translate = $translate;
    this.OvhManagerPciServingTokenService = OvhManagerPciServingTokenService;
    this.GROUPS = GROUPS;
  }

  $onInit() {
    this.isAdding = false;
    this.groupValid = false;
    this.token = {
      resource: this.resource,
      groups: null,
    };
  }

  changeGroup(group, value) {
    this.token.groups[group] = value;
    this.groupValid = reduce(
      Object.values(this.token.groups),
      (e, n) => e || n,
      false,
    );
  }

  addToken() {
    this.isAdding = true;

    return this.OvhManagerPciServingTokenService.add(
      this.projectId,
      this.namespaceId,
      {
        resource: this.token.resource,
        groups: Object.entries(this.token.groups)
          .filter(([, v]) => v)
          .map(([k]) => k),
      },
    )
      .then(({ token }) =>
        this.goBack(
          {
            textHtml: this.$translate.instant(
              'pci_projects_project_serving_namespace_tokens_add_success',
            ),
          },
          'success',
          token,
        ),
      )
      .catch((error) =>
        this.goBack(
          this.$translate.instant(
            'pci_projects_project_serving_namespace_tokens_add_error',
            {
              message: get(error, 'data.message'),
            },
          ),
          'error',
        ),
      );
  }
}
