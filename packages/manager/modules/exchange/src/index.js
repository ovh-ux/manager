import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

import billingAccountRenew from './billing/account-renew/renew.module';

import APIExchange from './exchange.api';
import Exchange from './exchange.service';
import ExchangePassword from './exchange.password.service';
import navigation from './services/exchange.navigation.service'; // used by emailpro

const moduleName = 'ovhManagerExchangeLazyLoading';

angular
  .module(moduleName, [billingAccountRenew, 'ui.router', 'oc.lazyLoad'])
  .config(
    /* @ngInject */ ($stateProvider) => {
      const lazyLoad = ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./exchange.module').then((mod) =>
          $ocLazyLoad.inject(mod.default || mod),
        );
      };

      $stateProvider.state('app.exchange.**', {
        url: '/configuration/exchange/:organization/:productId',
        lazyLoad,
      });

      $stateProvider.state('app.microsoft.exchange', {
        abstract: true,
        template: '<div data-ui-view></div>',
        translations: {
          value: ['.'],
          format: 'json',
        },
      });

      $stateProvider.state('app.microsoft.exchange.dedicated.**', {
        url: '/configuration/exchange_dedicated/:organization/:productId?tab',
        lazyLoad,
      });

      $stateProvider.state('app.microsoft.exchange.dedicatedCluster.**', {
        url:
          '/configuration/exchange_dedicatedCluster/:organization/:productId?tab',
        lazyLoad,
      });

      $stateProvider.state('app.microsoft.exchange.hosted.**', {
        url: '/configuration/exchange_hosted/:organization/:productId?tab',
        lazyLoad,
      });

      $stateProvider.state('app.microsoft.exchange.provider.**', {
        url: '/configuration/exchange_provider/:organization/:productId?tab',
        lazyLoad,
      });

      $stateProvider.state('app.microsoft.exchange.order.**', {
        url: '/configuration/exchange/order',
        lazyLoad,
      });
    },
  )
  .service('APIExchange', APIExchange)
  .service('Exchange', Exchange)
  .service('ExchangePassword', ExchangePassword)
  .service('navigation', navigation);

export default moduleName;
