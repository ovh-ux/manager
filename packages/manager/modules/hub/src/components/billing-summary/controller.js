import get from 'lodash/get';

export default class ManagerHubBillingSummaryCtrl {
  /* @ngInject */
  constructor($http, $q, $translate, atInternet, RedirectionService) {
    this.$http = $http;
    this.$q = $q;
    this.$translate = $translate;
    this.atInternet = atInternet;
    this.RedirectionService = RedirectionService;
  }

  $onInit() {
    const loadBills = this.$q
      .when(this.bills ? this.bills : this.fetchBills())
      .then(({ data }) => {
        this.bills = data;
        this.formattedBillingPrice = this.getFormattedPrice(
          data.total,
          get(data, 'currency.code'),
        );
        return this.bills;
      });
    const loadDebt = this.$q
      .when(this.debt ? this.debt : this.fetchDebt())
      .then(({ data }) => {
        this.debt = data;
        this.formattedDebtPrice = this.getFormattedPrice(
          get(data, 'dueAmount.value'),
          get(data, 'dueAmount.currencyCode'),
        );
        return this.debt;
      });

    this.$translate.refresh().then(() => {
      this.periods = [1, 3, 6].map((months) => ({
        value: months,
        label: this.$translate.instant(`hub_billing_summary_period_${months}`),
      }));
      [this.billingPeriod] = this.periods;
    });

    return this.$q.all([loadBills, loadDebt]);
  }

  onPeriodChange() {
    this.bills = null;
    this.formattedBillingPrice = null;
    return this.fetchBills(this.billingPeriod.value).then(({ data }) => {
      this.bills = data;
      this.formattedBillingPrice = this.getFormattedPrice(
        data.total,
        get(data, 'currency.code'),
      );
    });
  }

  getFormattedPrice(price, currency) {
    return Intl.NumberFormat(this.$translate.use().replace('_', '-'), {
      style: 'currency',
      currency,
      maximumSignificantdigits: 1,
    }).format(price);
  }

  fetchBills(monthlyPeriod = 1) {
    switch (monthlyPeriod) {
      case 1:
        this.atInternet.trackClick({
          name: `${this.trackingPrefix}::order::action::go-to-one-month`,
          type: 'action',
        });
        break;
      case 3:
        this.atInternet.trackClick({
          name: `${this.trackingPrefix}::order::action::go-to-three-month`,
          type: 'action',
        });
        break;
      case 6:
        this.atInternet.trackClick({
          name: `${this.trackingPrefix}::order::action::go-to-six-month`,
          type: 'action',
        });
        break;
      default:
        break;
    }
    return this.$http
      .get('/hub/bills', {
        serviceType: 'aapi',
        params: {
          billingPeriod: monthlyPeriod,
        },
      })
      .then(({ data }) => data)
      .then(({ data }) => data.bills);
  }

  fetchDebt() {
    return this.$http
      .get('/hub/debt', {
        serviceType: 'aapi',
      })
      .then(({ data }) => data)
      .then(({ data }) => data.debt);
  }
}
