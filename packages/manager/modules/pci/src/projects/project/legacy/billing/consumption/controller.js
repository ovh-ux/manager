import moment from 'moment';

export default /* @ngInject */ function ($state) {
  const self = this;

  function init() {
    self.currentDate = moment();

    $state.go('pci.projects.project.legacy.billing.consumption.current');
  }

  self.getBillingDateInfo = function getBillingDateInfo() {
    return {
      date: self.currentDate.format('LL'),
    };
  };

  init();
}
