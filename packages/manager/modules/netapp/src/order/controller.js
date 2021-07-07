import { uniq } from 'lodash-es';

export default class OvhManagerNetAppOrderCtrl {
  /* @ngInject */
  constructor($translate) {
    this.$translate = $translate;
  }

  $onInit() {
    this.selectedRegion = null;
    this.regions = uniq(
      this.catalog.plans.flatMap(
        ({ configurations }) =>
          configurations.find(({ name }) => name === 'region').values,
      ),
    );
  }

  onLicenceStepFocus() {
    console.log(this.selectedRegion, this.catalog.plans);
  }
}
