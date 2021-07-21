export default class {
  /* @ngInject */
  constructor($translate, ovhManagerPccDatacenterDatastoreService) {
    this.$translate = $translate;
    this.ovhManagerPccDatacenterDatastoreService = ovhManagerPccDatacenterDatastoreService;
  }

  $onInit() {
    this.loading = false;
  }

  convertToGlobal() {
    this.loading = true;
    this.ovhManagerPccDatacenterDatastoreService
      .convertToGlobal(this.productId, this.datacenterId, this.datastore.id)
      .then(() => {
        this.goBack(
          this.$translate.instant(
            'dedicatedCloud_datacenter_convert_to_global_success',
            {
              t0: this.datacenterId,
            },
          ),
        );
      })
      .catch((err) => {
        this.goBack(
          `${this.$translate.instant(
            'dedicatedCloud_datacenter_convert_to_global_error',
            {
              t0: this.datacenterId,
            },
          )} ${err.message || err}`,
          'danger',
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
