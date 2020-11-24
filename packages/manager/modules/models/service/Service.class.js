import get from 'lodash/get';
import sumBy from 'lodash/sumBy';
import Pricing from './Pricing.class';

export default class Service {
  constructor({ billing, serviceId, route, resource }) {
    Object.assign(this, {
      billing,
      serviceId,
      route: route || {},
      resource,
    });

    this.options = [];

    this.route.url = get(route, 'url', '').replace(
      this.resource.name,
      window.encodeURIComponent(this.resource.name),
    );

    this.totalPrice = this.billing.pricing.price.value;
  }

  get name() {
    return this.resource.displayName || this.resource.name;
  }

  get path() {
    return this.route.url;
  }

  get nextBillingDate() {
    return moment(this.billing.nextBillingDate).format('LL');
  }

  get productType() {
    return this.route.path
      .replace(/{.*}/, '')
      .split('/')
      .filter((item) => !!item)
      .join('_');
  }

  get monthlyPrice() {
    return this.price.monthlyPrice.text;
  }

  get price() {
    return new Pricing({
      ...this.billing.pricing,
      price: {
        ...this.billing.pricing.price,
        value: this.totalPrice,
      },
    });
  }

  get planCode() {
    return this.billing.plan.code;
  }

  addOptions(options) {
    this.options.push(...options);
    this.totalPrice += sumBy(options, 'totalPrice');
  }
}
