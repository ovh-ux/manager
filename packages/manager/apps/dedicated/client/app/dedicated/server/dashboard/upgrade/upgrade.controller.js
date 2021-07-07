import 'moment';

import { MIN_INTERVENTION_GAP } from './upgrade.constants';

export default class {
  /* @ngInject */
  constructor($http, $translate, $window, Alerter) {
    this.$http = $http;
    this.$window = $window;
    this.$translate = $translate;
    this.Alerter = Alerter;
  }

  $onInit() {
    this.interventionData = {
      backupDone: false,
      selectedDate: null,
    };
  }

  orderOption() {
    this.orderInProgress = true;
    const renewDetails = this.getRenewDetails(this.selectedOption);
    this.$http
      .post(
        `/services/${this.optionId}/upgrade/${this.selectedOption.planCode}/execute`,
        {
          duration: renewDetails.duration,
          pricingMode: renewDetails.pricingMode,
          quantity: 1,
        },
      )
      .then(({ data: order }) => {
        window.open(order.order.url, '_blank');
      })
      .catch((error) => {
        this.Alerter.error(
          this.$translate.instant(
            'dedicated_server_dashboard_upgrade_order_error',
            {
              message: error.data.message,
            },
          ),
          'server_dashboard_alert',
        );
        this.currentStep -= 1;
      })
      .finally(() => {
        this.orderInProgress = false;
      });
  }

  prepareInterventionData() {
    this.interventionData.minDate = moment()
      .add(MIN_INTERVENTION_GAP, 'days')
      .toISOString();
  }
}
