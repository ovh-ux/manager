import { DEDICATEDCLOUD_DATACENTER_DRP_OPTIONS } from '../../../dedicatedCloud-datacenter-drp.constants';

import legacyTemplate from '../../../../../../ip/ip/legacyOrder/ip-ip-legacyOrder.html';
import template from '../../../../../../ip/ip/agoraOrder/ip-ip-agoraOrder.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('app.dedicatedClouds.datacenter.drp.ovh.mainPccStep', {
      url: '/mainPcc',
      views: {
        'innerView@app.dedicatedClouds.datacenter.drp': {
          component: 'dedicatedCloudDatacenterDrpOvhMainPccStep',
        },
      },
      params: {
        currentStep: 1,
        drpInformations: {
          drpType: DEDICATEDCLOUD_DATACENTER_DRP_OPTIONS.ovh,
        },
      },
      resolve: {
        configurationStepName: () => 'mainPccStep',
        datacenterId: /* @ngInject */ ($transition$) =>
          $transition$.params().datacenterId,
        drpInformations: /* @ngInject */ ($transition$) =>
          $transition$.params().drpInformations,
        goBackToChoice: /* @ngInject */ ($state) => (selectedDrpType) =>
          $state.go('app.dedicatedClouds.datacenter.drp', { selectedDrpType }),
        goToNextStep: /* @ngInject */ ($state) => (drpInformations) =>
          $state.go('app.dedicatedClouds.datacenter.drp.ovh.secondPccStep', {
            drpInformations,
          }),
        ipAddressDetails: /* @ngInject */ (currentService, dedicatedCloudDrp) =>
          dedicatedCloudDrp.getPccIpAddressesDetails(
            currentService.serviceName,
          ),
      },
    })
    .state('app.dedicatedClouds.datacenter.drp.ovh.mainPccStep.legacyOrderIp', {
      url: '/legacyOrderIp',
      controller: 'IpLegacyOrderCtrl',
      controllerAs: 'ctrl',
      template: legacyTemplate,
      layout: 'modal',
      translations: { value: ['.'], format: 'json' },
    })
    .state('app.dedicatedClouds.datacenter.drp.ovh.mainPccStep.orderIp', {
      url: '/orderIp',
      controller: 'agoraIpOrderCtrl',
      controllerAs: 'ctrl',
      template,
      layout: 'modal',
      translations: { value: ['.'], format: 'json' },
    });
};
