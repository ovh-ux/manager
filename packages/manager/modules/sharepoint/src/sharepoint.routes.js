import set from 'lodash/set';

import sharepointCtrl from './sharepoint.controller';
import orderCtrl from './order/sharepoint-order.controller';
import urlCtrl from './url/sharepoint-url.controller';

import sharepointTpl from './sharepoint.html';
import sharepointOrderTpl from './order/sharepoint-order.html';
import sharepointUrlTpl from './url/sharepoint-url.html';

const routeBase = 'app.microsoft.sharepoint';

export default /* @ngInject */ ($stateProvider) => {
  const resolve = {
    navigationInformations: /* @ngInject */ (Navigator, $rootScope) => {
      set($rootScope, 'currentSectionInformation', 'sharepoint');
      return Navigator.setNavigationInformation({
        leftMenuVisible: true,
        configurationSelected: true,
      });
    },
  };

  $stateProvider.state(routeBase, {
    abstract: true,
    template: '<div ui-view></div>',
    translations: {
      value: ['.'],
      format: 'json',
    },
  });

  $stateProvider.state(`${routeBase}.order`, {
    url: '/configuration/microsoft/sharepoint/order',
    template: sharepointOrderTpl,
    reloadOnSearch: false,
    resolve,
  });

  $stateProvider.state(`${routeBase}.config`, {
    url: '/configuration/sharepoint/activate/:organizationId/:exchangeId',
    template: sharepointOrderTpl,
    controller: orderCtrl,
    controllerAs: 'SharepointOrderCtrl',
    reloadOnSearch: false,
    resolve,
  });

  $stateProvider.state(`${routeBase}.product`, {
    url: '/configuration/sharepoint/:exchangeId/:productId?tab',
    template: sharepointTpl,
    controller: sharepointCtrl,
    controllerAs: 'SharepointCtrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve,
  });

  $stateProvider.state(`${routeBase}.setUrl`, {
    url: '/configuration/sharepoint/:exchangeId/:productId/setUrl',
    template: sharepointUrlTpl,
    controller: urlCtrl,
    controllerAs: 'SharepointUrlCtrl',
    reloadOnSearch: false,
    resolve,
  });
};
