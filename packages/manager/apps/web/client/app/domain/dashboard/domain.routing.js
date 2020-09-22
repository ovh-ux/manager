import isEmpty from 'lodash/isEmpty';

const commonResolves = {
  associatedHostings: /* @ngInject */ (Domain, domainName) =>
    Domain.getAssociatedHosting(domainName).catch(() => []),
  hasEmailDomain: /* @ngInject */ ($http, domainName) =>
    $http
      .get(`/email/domain/${domainName}`)
      .then(() => true)
      .catch(() => false),
  zoneOption: /* @ngInject */ ($http, domainName) =>
    $http
      .get(`/domain/${domainName}/options`)
      .then((options) => options.data.zone),
  zoneCapabilities: /* @ngInject */ (DNSZoneService, zoneOption) =>
    zoneOption
      ? DNSZoneService.getCapabilities(zoneOption.serviceName).catch(() => ({
          dynHost: false,
        }))
      : { dynHost: false },
  breadcrumb: /* @ngInject */ (domainName) => domainName,
};

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.domain.product', {
    url: '/:productId',
    templateUrl: 'domain/dashboard/domain.html',
    controller: 'DomainCtrl',
    controllerAs: 'ctrlDomain',
    reloadOnSearch: false,
    atInternet: {
      ignore: true, // this tell AtInternet to not track this state
    },
    redirectTo: 'app.domain.product.information',
    resolve: {
      ...commonResolves,
      currentSection: () => 'domain',
      domain: /* @ngInject */ (Domain, domainName) =>
        Domain.getSelected(domainName),
      domainName: /* @ngInject */ ($transition$) =>
        $transition$.params().productId,
      goToWebhostingOrder: /* @ngInject */ ($state) => () =>
        $state.go('app.domain.product.webhosting.order'),
      navigationInformations: [
        'Navigator',
        '$rootScope',
        (Navigator, $rootScope) => {
          // eslint-disable-next-line no-param-reassign
          $rootScope.currentSectionInformation = 'domain';
          return Navigator.setNavigationInformation({
            leftMenuVisible: true,
            configurationSelected: true,
          });
        },
      ],
      orderedHosting: /* @ngInject */ ($q, domainName, Hosting) =>
        Hosting.getSelected(domainName)
          .then(({ offer, serviceName }) =>
            isEmpty(offer) ? null : serviceName,
          )
          .catch((error) => (error.code === 404 ? null : $q.reject(error))),

      goToDns: /* @ngInject */ ($state) => () =>
        $state.go('app.domain.product.dns'),
      goToDnsAnycast: /* @ngInject */ ($state) => () =>
        $state.go('app.domain.product.anycast'),
    },
    translations: {
      value: [
        '../../core',
        '../../email',
        '../../hosting',
        '../../domain-operation',
      ],
      format: 'json',
    },
  });

  $stateProvider.state('app.alldom.domain', {
    url: '/:allDom/:productId',
    templateUrl: 'domain/dashboard/domain.html',
    controller: 'DomainCtrl',
    controllerAs: 'ctrlDomain',
    reloadOnSearch: false,
    redirectTo: 'app.alldom.domain.information',
    resolve: {
      ...commonResolves,
      allDom: /* @ngInject */ ($transition$) => $transition$.params().allDom,
      currentSection: () => 'domain',
      domain: /* @ngInject */ (Domain, domainName) =>
        Domain.getSelected(domainName),
      domainName: /* @ngInject */ ($transition$) =>
        $transition$.params().productId,
      goToWebhostingOrder: /* @ngInject */ ($state) => () =>
        $state.go('app.alldom.domain.webhosting.order'),
      navigationInformations: [
        'Navigator',
        '$rootScope',
        (Navigator, $rootScope) => {
          // eslint-disable-next-line no-param-reassign
          $rootScope.currentSectionInformation = 'all_dom';
          return Navigator.setNavigationInformation({
            leftMenuVisible: true,
            configurationSelected: true,
          });
        },
      ],
      orderedHosting: /* @ngInject */ ($q, domainName, Hosting) =>
        Hosting.getSelected(domainName)
          .then(({ offer, serviceName }) =>
            isEmpty(offer) ? null : serviceName,
          )
          .catch((error) => (error.code === 404 ? null : $q.reject(error))),

      goToDns: /* @ngInject */ ($state) => () =>
        $state.go('app.alldom.domain.dns'),
      goToDnsAnycast: /* @ngInject */ ($state) => () =>
        $state.go('app.alldom.domain.anycast'),
    },
    translations: {
      value: [
        '../../core',
        '../../domain',
        '../../email',
        '../../hosting',
        '../../domain-operation',
      ],
      format: 'json',
    },
  });
};
