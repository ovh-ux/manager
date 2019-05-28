import get from 'lodash/get';
import filter from 'lodash/filter';
import head from 'lodash/head';

// we should avoid require, but JSURL don't provide an es6 export
const { stringify } = require('jsurl');

export default class CloudProjectBillingVouchersAddcreditAgoraCtrl {
  /* @ngInject */
  constructor(
    $http,
    $q,
    $translate,
    $uibModalInstance,
    $window,
    CucCloudMessage,
  ) {
    this.$http = $http;
    this.$q = $q;
    this.$translate = $translate;
    this.$uibModalInstance = $uibModalInstance;
    this.$window = $window;
    this.CucCloudMessage = CucCloudMessage;
    this.orderLimits = {
      min: 1,
      max: 20000000,
    };
  }

  $onInit() {
    this.amount = 10;
    this.loading = true;
    return this.$http.get('/order/catalog/formatted/cloud', {
      serviceType: 'apiv6',
      params: {
        ovhSubsidiary: 'US',
      },
    }).then((result) => {
      this.price = get(
        head(
          filter(
            get(
              head(
                filter(
                  get(result, 'data.plans'),
                  p => p.planCode === 'credit' && p.pricingType === 'purchase',
                ),
              ),
              'details.pricings.default',
            ),
            p => p.capacities.indexOf('installation') >= 0,
          ),
        ),
        'price',
      );
    }).catch((err) => {
      this.CucCloudMessage.error([this.$translate.instant('cpb_vouchers_add_credit_load_err'), get(err, 'data.message', '')].join(' '));
      return this.cancel();
    }).finally(() => {
      this.loading = false;
    });
  }

  order() {
    const order = {
      planCode: 'credit',
      productId: 'cloud',
      pricingMode: 'default',
      quantity: Math.floor(this.amount / this.price.value),
      configuration: [{
        label: 'type',
        value: 'public_cloud',
      }],
    };
    this.$window.open(`https://us.ovhcloud.com/order/express/#/express/review?products=${stringify([order])}`, '_blank');
    this.cancel();
  }

  cancel() {
    return this.$state.go('^');
  }
}
