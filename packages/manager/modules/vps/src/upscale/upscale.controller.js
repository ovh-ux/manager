import capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';

import { Price } from '@ovh-ux/manager-models';
import UpscaleService from './upscale.service';
import { PRICING_MODES, RANGES } from './upscale.constants';

export default class UpscaleController {
  /* @ngInject */
  constructor(
    $translate,
    ovhManagerProductOffersService,
    OVH_MANAGER_PRODUCT_OFFERS_PRICING_CONSTANTS,
  ) {
    this.$translate = $translate;
    this.ovhManagerProductOffersService = ovhManagerProductOffersService;
    this.PRICING_CAPACITIES =
      OVH_MANAGER_PRODUCT_OFFERS_PRICING_CONSTANTS.PRICING_CAPACITIES;
  }

  $onInit() {
    this.currentIndex = 0;
    this.errorMessage = null;
    this.resetRangeConfiguration();
    this.getCurrentRangeInformation();

    this.loading = {
      getUpscaleInformation: false,
      performUpscale: false,
    };

    this.currentVpsRange = UpscaleController.getSimpleRangeName(
      this.vps.model.name,
    );

    this.isEliteUpgrade = UpscaleController.isRangeElite(this.currentVpsRange);

    let upscaleRanges = UpscaleController.groupRanges(
      this.upscaleOptions,
      this.vps.model.name,
    );
    upscaleRanges = this.filterLowerRanges(this.currentVpsRange, upscaleRanges);
    upscaleRanges = upscaleRanges
      .filter(({ formattedName }) => formattedName !== RANGES.STARTER)
      .map((range) => this.formatRange(range));

    this.upscaleRanges = sortBy(upscaleRanges, 'indicativePricing.price');

    if (this.isEliteUpgrade) {
      this.range = this.upscaleRanges.find(({ formattedName }) =>
        UpscaleController.isRangeElite(formattedName),
      );
      this.goToNextStep(this.range.formattedName);
    }
  }

  resetRangeConfiguration() {
    this.rangeConfiguration = {
      bandwidth: null,
      cores: null,
      memory: null,
      storage: null,
    };
  }

  getCurrentRangeInformation() {
    this.currentRangeConfiguration = UpscaleController.parseRangeConfiguration(
      this.vps.model.name,
    );

    const currentRangePricing = this.getIndicativePricing(
      this.upscaleOptions.find(
        ({ planCode }) => planCode === this.vps.model.name,
      ).prices,
    );

    this.currentRangeConfiguration.pricing = {
      currency: this.connectedUser.currency.code,
      unit: Price.UNITS.MICROCENTS,
      value: currentRangePricing.priceInUcents,
    };
  }

  static getSimpleRangeName(rangeFullName) {
    const rangesKeys = Object.values(RANGES).join('|');
    const [simpleRangeName] = rangeFullName.match(
      new RegExp(rangesKeys, 'i'), // Range names have the following pattern: vps-xxxx-X-X-X, e.g.: vps-starter-1-8-20
    );
    return capitalize(simpleRangeName);
  }

  static isRangeElite(rangeName) {
    return rangeName === RANGES.ELITE;
  }

  static formatPrice(price, priceInUcents) {
    return {
      currency: price.currencyCode,
      unit: Price.UNITS.MICROCENTS,
      value: priceInUcents,
    };
  }

  formatRange(range) {
    return {
      ...range,
      isCurrentRange: range.formattedName === this.currentVpsRange,
      indicativePricing: this.getIndicativePricing(range.prices),
      formattedTechnical: {
        bandwidth: UpscaleController.getExtremumValueOfUnit(
          range.technicals,
          'bandwidth.level',
          maxBy,
        ),
        cpu: UpscaleController.getExtremumValueOfUnit(
          range.technicals,
          'cpu.cores',
          maxBy,
        ),
        memory: UpscaleController.getRangeOfUnit(
          range.technicals,
          'memory.size',
        ),
        storage: UpscaleController.getRangeOfUnit(
          range.technicals,
          'storage.disks[0].capacity',
        ),
      },
    };
  }

  goToNextStep(range) {
    this.currentIndex = UpscaleController.isRangeElite(range) ? 1 : 2;
  }

  getIndicativePricing(pricings) {
    const renewPricing = this.ovhManagerProductOffersService.constructor.getUniquePricingOfCapacity(
      pricings,
      this.PRICING_CAPACITIES.RENEW,
    );

    return {
      ...renewPricing,
      price: UpscaleController.formatPrice(
        renewPricing.price,
        renewPricing.priceInUcents,
      ),
    };
  }

  static isRangeEliteConfigurationComplete({
    bandwidth,
    cores,
    memory,
    storage,
  }) {
    return (
      bandwidth != null && cores != null && memory != null && storage != null
    );
  }

  static isPlanCodeDifferent(newPlanCode, currentPlanCode) {
    return newPlanCode !== currentPlanCode;
  }

  getRangeEliteConfigurationPricing() {
    if (
      UpscaleController.isRangeEliteConfigurationComplete(
        this.rangeConfiguration,
      )
    ) {
      this.planCode = UpscaleController.getPlanCodeFromSelectedRangeAndConfiguration(
        this.rangeConfiguration,
        this.range.formattedName.toLowerCase(),
      );

      const matchingPlanCode = this.upscaleOptions.find(
        ({ planCode }) => planCode === this.planCode,
      );
      const renewPricing = this.ovhManagerProductOffersService.constructor.getUniquePricingOfCapacity(
        matchingPlanCode.prices,
        this.PRICING_CAPACITIES.RENEW,
      );

      this.rangeConfiguration.pricing = {
        currency: this.connectedUser.currency.code,
        pricingMode: UpscaleService.convertPricingMode(
          renewPricing.pricingMode,
        ),
        unit: Price.UNITS.MICROCENTS,
        value: renewPricing.priceInUcents,
      };
    }
  }

  filterLowerRanges(currentRangeName, allRanges) {
    const currentRange = allRanges.find(
      ({ formattedName }) => formattedName === capitalize(currentRangeName),
    );
    return allRanges.filter(({ prices }) => {
      const renewPricing = this.getIndicativePricing(prices);
      const currentRangeRenewPricing = this.getIndicativePricing(
        currentRange.prices,
      );

      return (
        renewPricing.priceInUcents >= currentRangeRenewPricing.priceInUcents
      );
    });
  }

  fetchUpscaleInformation(_planCode) {
    this.loading.getUpscaleInformation = true;
    let planCode = _planCode;
    if (!planCode) {
      planCode = this.range.planCode;
    }

    return this.getUpscaleInformation(planCode)
      .then(({ order }) => {
        this.order = order;
        this.order.prices.withoutTax.unit = Price.UNITS.CENTS;
        this.order.prices.withoutTax.text = UpscaleService.buildPriceToDisplay(
          {
            currency: this.connectedUser.currency.code,
            value: order.prices.withoutTax.value,
          },
          this.connectedUser.language,
        );
      })
      .catch((error) => {
        const errorMessage = UpscaleController.isRangeElite(
          this.range.formattedName,
        )
          ? this.$translate.instant(
              'vps_upscale_get_configuration_information_error',
            )
          : this.$translate.instant('vps_upscale_get_information_error');

        this.errorMessage = `${errorMessage} ${get(error, 'data.message')}`;
        this.scrollToTop();
      })
      .finally(() => {
        this.loading.getUpscaleInformation = false;
      });
  }

  static getPlanCodeFromSelectedRangeAndConfiguration(
    configuration,
    rangeName,
  ) {
    const { cores, memory, storage } = configuration;
    return `vps-${rangeName}-${cores}-${memory}-${storage}`;
  }

  static groupRanges(ranges, currentPlanCode) {
    let groupedRanges = ranges
      .filter(({ planCode }) =>
        UpscaleController.filterPlanCodeByConfiguration(
          planCode,
          currentPlanCode,
        ),
      )
      .sort((rangeA, rangeB) =>
        UpscaleController.sortPlanCodesByConfiguration(
          rangeA.planCode,
          rangeB.planCode,
        ),
      );

    groupedRanges = UpscaleController.groupRangesByName(groupedRanges);
    return UpscaleController.reduceRangesGroup(groupedRanges);
  }

  static groupRangesByName(ranges) {
    return groupBy(ranges, ({ name }) =>
      UpscaleController.getSimpleRangeName(name),
    );
  }

  static reduceRangesGroup(groupedRanges) {
    return Object.entries(groupedRanges).map(([rangeName, rangeGroup]) => ({
      ...rangeGroup.reduce(
        (group, range) => ({
          ...group,
          technicals: group.technicals.concat(range.blobs.technical),
        }),
        {
          ...rangeGroup[0],
          technicals: [rangeGroup[0].blobs.technical],
        },
      ),
      formattedName: rangeName,
    }));
  }

  static getExtremumValueOfUnit(technicals, path, functionToApply) {
    const extremum = functionToApply(technicals, path);

    return parseInt(get(extremum, path), 10);
  }

  static getRangeOfUnit(technicals, path) {
    const min = UpscaleController.getExtremumValueOfUnit(
      technicals,
      path,
      minBy,
    );
    const max = UpscaleController.getExtremumValueOfUnit(
      technicals,
      path,
      maxBy,
    );

    return {
      min,
      max,
      minEqualMax: min === max,
    };
  }

  static filterPlanCodeByConfiguration(planCode, basePlanCode) {
    const [
      cores,
      memory,
      storage,
    ] = UpscaleController.extractConfigurationFromPlanCode(planCode);
    const [
      bCores,
      bMemory,
      bStorage,
    ] = UpscaleController.extractConfigurationFromPlanCode(basePlanCode);

    return cores >= bCores && memory >= bMemory && storage >= bStorage;
  }

  static sortPlanCodesByConfiguration(planCodeA, planCodeB) {
    const numericPlanCodeA = parseInt(
      UpscaleController.extractConfigurationFromPlanCode(planCodeA).join(''),
      10,
    );
    const numericPlanCodeB = parseInt(
      UpscaleController.extractConfigurationFromPlanCode(planCodeB).join(''),
      10,
    );

    if (numericPlanCodeA < numericPlanCodeB) {
      return -1;
    }

    if (numericPlanCodeA > numericPlanCodeB) {
      return 1;
    }

    return 0;
  }

  discardRangesWithLowerConfiguration(technicals, path) {
    return technicals.filter(
      (technical) =>
        !has(this.currentRangeConfiguration, path) ||
        get(technical, path) >= get(this.currentRangeConfiguration, path),
    );
  }

  static parseRangeConfiguration(rangeFullName) {
    const [
      cores,
      memory,
      storage,
    ] = UpscaleController.extractConfigurationFromPlanCode(rangeFullName);

    return {
      cpu: { cores },
      memory: { size: memory },
      storage: { disks: [{ capacity: storage }] },
    };
  }

  static extractConfigurationFromPlanCode(planCode) {
    const [cores, memory, storage] = planCode.match(/\d+/g);
    return [parseInt(cores, 10), parseInt(memory, 10), parseInt(storage, 10)];
  }

  getAvailableValuesForParameter(technicals, path) {
    if (!technicals) {
      return [];
    }

    return sortBy(
      uniqBy(
        this.discardRangesWithLowerConfiguration(
          technicals,
          path,
        ).map((technical) => get(technical, path)),
      ),
      (value) => value,
    );
  }

  formatNewRangeInformation() {
    let newRangeInformation;
    if (
      !UpscaleController.isRangeEliteConfigurationComplete(
        this.rangeConfiguration,
      )
    ) {
      newRangeInformation = UpscaleController.parseRangeConfiguration(
        this.range.planCode,
      );

      newRangeInformation.pricing = {
        currency: this.order.prices.withoutTax.currencyCode,
        paymentType: UpscaleService.convertPricingMode(
          this.range.indicativePricing.pricingMode,
        ),
        unit: Price.UNITS.MICROCENTS,
        value: this.range.indicativePricing.priceInUcents,
      };
    } else {
      newRangeInformation = {
        cpu: { cores: this.rangeConfiguration.cores },
        memory: { size: this.rangeConfiguration.memory },
        pricing: this.rangeConfiguration.pricing,
        storage: { disks: [{ capacity: this.rangeConfiguration.storage }] },
      };
    }

    this.newRangeInformation = newRangeInformation;
  }

  getValidationInformation() {
    let validationText = 'vps_upscale_summary_price_upfront_validation';
    if (
      this.newRangeInformation.pricing.paymentType === PRICING_MODES.MONTHLY
    ) {
      if (this.defaultPaymentMethod) {
        validationText =
          'vps_upscale_summary_price_monthly_engaged_with_payment_method_validation';
      } else {
        validationText =
          'vps_upscale_summary_price_monthly_engaged_without_payment_method_validation';
      }
    }

    return validationText;
  }

  performUpscaleService() {
    this.loading.performUpscale = true;
    const planCode = this.planCode || this.range.planCode;

    return this.performUpscale(planCode)
      .then((upscaleOrder) => {
        this.goToUpgradeSuccess(
          {
            upgradeOrderId: upscaleOrder.order.orderId,
            upgradeStatus: 'success',
            upgradeType: 'memory',
          },
          {
            location: false,
            reload: 'vps.detail.dashboard',
          },
        );
      })
      .catch((error) => {
        let errorMessage = this.$translate.instant('vps_upscale_error');
        if (this.isEliteUpgrade) {
          errorMessage = this.$translate.instant(
            'vps_upscale_elite_upgrade_error',
          );
        }

        this.errorMessage = `${errorMessage} ${get(error, 'data.message')}`;
        this.scrollToTop();
      })
      .finally(() => {
        this.loading.performUpscale = false;
      });
  }
}
