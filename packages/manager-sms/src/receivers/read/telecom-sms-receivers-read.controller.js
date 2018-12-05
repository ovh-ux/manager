import angular from 'angular';
import _ from 'lodash';

export default class {
  /* @ngInject */
  constructor($stateParams, $translate, $uibModalInstance, receiver, csv) {
    this.$stateParams = $stateParams;
    this.$translate = $translate;
    this.$uibModalInstance = $uibModalInstance;
    this.receiver = receiver;
    this.csv = csv;
  }

  $onInit() {
    this.model = {
      receiver: angular.copy(this.receiver),
      csv: angular.copy(this.csv),
    };
  }

  /**
     * Set filename base on service name and description.
     * @return {String}
     */
  setFilename() {
    return `${_.kebabCase([
      this.$stateParams.serviceName,
      this.$translate.instant('sms_tabs_contacts'),
      _.get(this.model.receiver, 'description', ''),
    ].join())}.csv`;
  }

  close() {
    return this.$uibModalInstance.close(true);
  }
}
