import find from 'lodash/find';
import sortBy from 'lodash/sortBy';

import { CATALOG_PRODUCT } from './hosting-database-order-private.constant';

export default class HostingDatabaseOrderPrivateService {
  /* @ngInject */
  constructor($filter, Hosting, OrderCartService) {
    this.$filter = $filter;
    this.Hosting = Hosting;
    this.OrderCartService = OrderCartService;
  }

  async getCatalogProducts(ovhSubsidiary, products) {
    if (!products || !products.length) {
      return [];
    }

    const { name, category } = CATALOG_PRODUCT;
    const catalog = await this.OrderCartService.getProductPublicCatalog(
      ovhSubsidiary,
      name,
    );

    return products.map((item) =>
      find(catalog[category], { planCode: item.planCode }),
    );
  }

  async getServices() {
    const services = await this.Hosting.getHostings();

    return services.sort();
  }

  async getDatacenter(serviceName) {
    const { datacenter } = await this.Hosting.getHosting(serviceName);

    return datacenter;
  }

  async getProducts(cartId) {
    const result = await this.OrderCartService.getProductOffers(
      cartId,
      'privateSQL',
    );

    if (!result.length) {
      return undefined;
    }

    // Get RAM from the productName, and sort the results
    const products = result.map((product) => {
      const [ramSize] = product.productName.match(/\d+/g);
      return {
        ...product,
        label: this.$filter('cucBytes')(ramSize, undefined, false, 'MB'),
        ramSize: parseInt(ramSize, 10),
      };
    });

    return sortBy(products, 'ramSize');
  }

  async prepareOrderCart(ovhSubsidiary) {
    const { cartId } = await this.OrderCartService.createNewCart(ovhSubsidiary);

    await this.OrderCartService.assignCart(cartId);

    return cartId;
  }

  async addItemToCart(cartId, datacenter, price, product, version) {
    const { itemId } = await this.OrderCartService.addProductToCart(
      cartId,
      'privateSQL',
      {
        duration: price.duration,
        planCode: product.planCode,
        pricingMode: price.pricingMode,
        quantity: price.minimumQuantity,
      },
    );

    await this.OrderCartService.addConfigurationItem(
      cartId,
      itemId,
      'dc',
      datacenter,
    );
    await this.OrderCartService.addConfigurationItem(
      cartId,
      itemId,
      'engine',
      version,
    );

    return this.OrderCartService.getCheckoutInformations(cartId);
  }

  resetOrderCart(cartId) {
    return this.OrderCartService.deleteAllItems(cartId);
  }

  checkoutOrderCart(autoPayWithPreferredPaymentMethod, cartId) {
    return this.OrderCartService.checkoutCart(cartId, {
      autoPayWithPreferredPaymentMethod,
    });
  }
}
