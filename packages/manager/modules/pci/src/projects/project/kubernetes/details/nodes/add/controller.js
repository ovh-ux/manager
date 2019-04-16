import clone from 'lodash/clone';
import find from 'lodash/find';
import get from 'lodash/get';
import head from 'lodash/head';
import includes from 'lodash/includes';

import { FLAVOR_TYPES } from './constants';

export default class KubernetesNodesAddCtrl {
  /* @ngInject */
  constructor(
    $q, $state, $stateParams, $translate, $uibModalInstance,
    CucFlavorService, Kubernetes, OvhApiMe, CucPriceHelper, projectId,
    CUC_FLAVOR_FLAVORTYPE_CATEGORY,
  ) {
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$translate = $translate;
    this.$uibModalInstance = $uibModalInstance;
    this.CucFlavorService = CucFlavorService;
    this.Kubernetes = Kubernetes;
    this.OvhApiMe = OvhApiMe;
    this.CucPriceHelper = CucPriceHelper;
    this.projectId = projectId;
    this.CUC_FLAVOR_FLAVORTYPE_CATEGORY = CUC_FLAVOR_FLAVORTYPE_CATEGORY;
  }

  $onInit() {
    this.loading = true;
    this.serviceName = this.$stateParams.serviceName;

    this.getPublicCloudProject()
      .then(() => this.$q.all({
        quotas: this.getProjectQuota(),
        prices: this.getPrices(),
      }))
      .then(({ quotas, prices }) => this.getFlavors(quotas, prices))
      .catch(error => this.$uibModalInstance.dismiss(this.$translate.instant('kube_nodes_add_flavor_error', { message: get(error, 'data.message', '') })))
      .finally(() => { this.loading = false; });
  }

  getPublicCloudProject() {
    return this.Kubernetes.getAssociatedPublicCloudProjects(this.serviceName)
      .then((projects) => { this.project = head(projects); });
  }

  getProjectQuota() {
    return this.Kubernetes.getProjectQuota(this.project.projectId);
  }

  getFlavors(quotas, prices) {
    return this.Kubernetes.getFlavors(this.projectId)
      .then((flavors) => {
        /**
        * @type {{id: string, familyName: string, flavors: Object[]}}
        */
        this.flavorFamilies = this.CUC_FLAVOR_FLAVORTYPE_CATEGORY
          .filter(type => includes(FLAVOR_TYPES, type.id))
          .map(category => (
            {
              id: category.id,
              familyName: this.$translate.instant(`kube_nodes_add_flavor_family_${category.id}`),
              flavors: flavors
                .filter(flavor => includes(category.types, flavor.type) && flavor.osType !== 'windows')
                .map(flavor => ({
                  name: flavor.name,
                  displayedName: this.Kubernetes.formatFlavor(flavor),
                  quotaOverflow: this.getQuotaOverflow(flavor, quotas),
                  price: get(get(prices, flavor.planCodes.hourly), 'price.text'),
                })),
            }));
        return flavors;
      });
  }

  getSubsidiary() {
    return this.OvhApiMe.v6().get().then(({ subsidiary }) => { this.subsidiary = subsidiary; });
  }

  getPrices() {
    return this.CucPriceHelper.getPrices(this.project.projectId);
  }

  getQuotaOverflow(flavor, quotas) {
    // addOverQuotaInfos adds 'disabled' key to flavor parameter
    const testedFlavor = clone(flavor);
    this.CucFlavorService.constructor.addOverQuotaInfos(testedFlavor, quotas);
    return get(testedFlavor, 'disabled');
  }

  onFlavorFamilyChange(selectedFamily) {
    this.selectedFlavor = null;
    this.flavors = find(this.flavorFamilies, family => family.id === selectedFamily.id).flavors;
  }

  addNode() {
    this.loading = true;
    return this.Kubernetes.addNode(this.serviceName, this.nodeName, this.selectedFlavor.name)
      .then(() => this.$uibModalInstance.close())
      .catch(error => this.$uibModalInstance.dismiss(this.$translate.instant('kube_nodes_add_error', { message: get(error, 'data.message', '') })))
      .finally(() => { this.loading = false; });
  }

  instanceIsValid() {
    return !this.selectedFlavor.quotaOverflow;
  }

  dismiss(error) {
    this.$uibModalInstance.dismiss(error);
  }

  goToProjectQuota() {
    this.$uibModalInstance.close();
    this.$state.go('iaas.pci-project.compute.quota', { projectId: this.project.projectId });
  }
}
