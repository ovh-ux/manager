import { uniq } from 'lodash-es';

const findRegionConfiguration = (configurations) =>
  configurations.find(({ name }) => name === 'region')?.values;

const getPlansWithRegion = (catalog, region) =>
  catalog.plans.filter(({ configurations }) =>
    findRegionConfiguration(configurations).includes(region),
  );

const getPlansWithLicense = (plans, license) =>
  plans.filter(({ blobs }) => blobs?.commercial?.brick === license);

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
    const plans = getPlansWithRegion(this.catalog, this.selectedRegion);
    this.licenses = uniq(
      plans
        .flatMap(({ blobs }) => blobs?.commercial?.brick)
        .filter((value) => !!value),
    );
  }

  onSizeStepFocus() {
    // const { plans } = this.catalog;
    const plans = getPlansWithRegion(this.catalog, this.selectedRegion);
    const availablePlans = getPlansWithLicense(plans, this.selectedLicense);

    console.log(availablePlans);
  }
}
