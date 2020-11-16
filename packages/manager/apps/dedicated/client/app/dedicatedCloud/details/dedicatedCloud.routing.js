import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';

import { DedicatedCloud as DedicatedCloudInfo } from '@ovh-ux/manager-models';
import { Environment } from '@ovh-ux/manager-config';
import { SURVEY } from './dedicatedCloud.constants';

import {
  DEDICATEDCLOUD_DATACENTER_DRP_STATUS,
  DEDICATEDCLOUD_DATACENTER_DRP_VPN_CONFIGURATION_STATUS,
} from '../../components/dedicated-cloud/datacenter/drp/dedicatedCloud-datacenter-drp.constants';

export default /* @ngInject */ ($stateProvider, $urlServiceProvider) => {
  $stateProvider.state('app.dedicatedCloud.details', {
    url: '/:productId',
    redirectTo: 'app.dedicatedCloud.details.dashboard',
    resolve: {
      currentService: /* @ngInject */ (DedicatedCloud, productId) =>
        DedicatedCloud.getSelected(productId, true).then(
          (dedicatedCloudData) => new DedicatedCloudInfo(dedicatedCloudData),
        ),
      currentDrp: /* @ngInject */ (dedicatedCloudDrp, productId) =>
        dedicatedCloudDrp.getPccDrpPlan(productId).then((states) => {
          const existingPlan = states.find(
            ({ state }) =>
              state !== DEDICATEDCLOUD_DATACENTER_DRP_STATUS.disabled,
          );

          // If no plan with state other than disabled, let's return the first datacenter plan
          const currentDrp = existingPlan || sortBy(states, 'datacenterId')[0];

          const drpVpnStatus = get(
            currentDrp,
            'remoteSiteInformation.vpnConfigState',
          );
          currentDrp.vpnStatus = drpVpnStatus;
          currentDrp.isWaitingVpnConfiguration =
            drpVpnStatus != null &&
            drpVpnStatus !==
              DEDICATEDCLOUD_DATACENTER_DRP_VPN_CONFIGURATION_STATUS.configured;

          currentDrp.state = dedicatedCloudDrp.constructor.formatStatus(
            currentDrp.state,
          );

          return dedicatedCloudDrp
            .getDisableSuccessAlertPreference(productId)
            .then((alertPreferenceValue) => {
              currentDrp.isSuccessAlertDisable = alertPreferenceValue;
            })
            .catch(() => {
              currentDrp.isSuccessAlertDisable = true;
            })
            .then(() => currentDrp);
        }),
      datacenterList: /* @ngInject */ ($stateParams, DedicatedCloud) =>
        DedicatedCloud.getDatacenters($stateParams.productId).then(
          ({ results }) => results,
        ),

      dedicatedCloud: /* @ngInject */ (
        $stateParams,
        currentUser,
        DedicatedCloud,
        dedicatedCloudDescription,
        dedicatedCloudServiceInfos,
      ) =>
        DedicatedCloud.getSelected($stateParams.productId, true).then(
          (dedicatedCloud) => ({
            ...dedicatedCloud,
            ...dedicatedCloudDescription,
            email: currentUser.email,
            serviceInfos: dedicatedCloudServiceInfos,
          }),
        ),

      dedicatedCloudDescription: /* @ngInject */ (
        $stateParams,
        DedicatedCloud,
      ) => DedicatedCloud.getDescription($stateParams.productId),

      dedicatedCloudServiceInfos: /* @ngInject */ (
        $stateParams,
        OvhApiDedicatedCloud,
      ) =>
        OvhApiDedicatedCloud.v6().getServiceInfos({
          serviceName: $stateParams.productId,
        }),

      drpGlobalStatus: /* @ngInject */ (currentDrp, dedicatedCloudDrp) => ({
        error:
          dedicatedCloudDrp.constructor.isDrpNotInValidState(
            currentDrp.state,
          ) ||
          dedicatedCloudDrp.constructor.isDrpNotInValidState(
            currentDrp.vpnStatus,
          ),
        warning:
          dedicatedCloudDrp.constructor.isDrpInChangingState(
            currentDrp.state,
          ) ||
          dedicatedCloudDrp.constructor.isDrpInChangingState(
            currentDrp.vpnStatus,
          ),
        success: dedicatedCloudDrp.constructor.isDrpInValidState(
          currentDrp.state,
        ),
      }),
      editDetails: /* @ngInject */ ($uibModal, productId) => (data) =>
        $uibModal.open({
          animation: true,
          templateUrl: 'components/name-edition/name-edition.html',
          controller: 'NameEditionCtrl',
          controllerAs: '$ctrl',
          resolve: {
            data: () => ({
              ...data,
              productId,
            }),
          },
        }),
      isDrpActionPossible: /* @ngInject */ (currentDrp, dedicatedCloudDrp) =>
        dedicatedCloudDrp.constructor.isDrpActionPossible(currentDrp),

      datacentersState: () => 'app.dedicatedCloud.details.datacenter',
      pccDashboardState: () => 'app.dedicatedCloud.details.dashboard',
      licenseState: () => 'app.dedicatedCloud.details.license',
      operationState: () => 'app.dedicatedCloud.details.operation',
      securityState: () => 'app.dedicatedCloud.details.security',
      usersState: () => 'app.dedicatedCloud.details.users',
      goToDrp: /* @ngInject */ ($state, currentDrp) => (datacenterId) =>
        $state.go('app.dedicatedCloud.details.datacenter.details.drp', {
          datacenterId,
          drpInformations: currentDrp,
        }),
      goToDrpDatacenterSelection: /* @ngInject */ ($state) => () =>
        $state.go(
          'app.dedicatedCloud.details.dashboard.drpDatacenterSelection',
        ),
      goToPccDashboard: /* @ngInject */ ($state) => (reload = false) =>
        $state.go('app.dedicatedCloud.details', {}, { reload }),
      goToVpnConfiguration: /* @ngInject */ ($state, currentDrp) => () =>
        $state.go('app.dedicatedCloud.details.datacenter.details.drp.summary', {
          datacenterId: currentDrp.datacenterId,
          drpInformations: currentDrp,
        }),
      goToDatacenter: /* @ngInject */ ($state, productId) => (datacenterId) =>
        $state.go('app.dedicatedCloud.details.datacenter.details', {
          productId,
          datacenterId,
        }),
      goToDatastores: /* @ngInject */ ($state, productId) => (datacenterId) =>
        $state.go('app.dedicatedCloud.details.datacenter.details.datastores', {
          productId,
          datacenterId,
        }),
      goToHosts: /* @ngInject */ ($state, productId) => (datacenterId) =>
        $state.go('app.dedicatedCloud.details.datacenter.details.hosts', {
          productId,
          datacenterId,
        }),
      goToUsers: /* @ngInject */ ($state) => () =>
        $state.go('app.dedicatedCloud.details.users'),
      serviceName: /* @ngInject */ (productId) => productId,
      productId: /* @ngInject */ ($transition$) =>
        $transition$.params().productId,
      goBackToState: /* @ngInject */ (
        $state,
        $timeout,
        currentService,
        setMessage,
      ) => (state, message = false, type = 'success', reload = undefined) => {
        const promise = $state.go(
          state,
          { productId: currentService.serviceName },
          {
            reload: isUndefined(reload)
              ? message && type === 'success'
              : reload,
          },
        );

        if (message) {
          promise.then(() => $timeout(() => setMessage(message, type)));
        }

        return promise;
      },
      goBackToDashboard: /* @ngInject */ (goBackToState) => (
        message = false,
        type = 'success',
      ) => goBackToState('app.dedicatedCloud.details.dashboard', message, type),
      operationsUrl: /* @ngInject */ ($state, currentService) =>
        $state.href('app.dedicatedCloud.details.operation', {
          productId: currentService.serviceName,
        }),
      optionsAvailable: /* @ngInject */ (
        currentService,
        currentUser,
        ovhManagerPccDashboardOptionsService,
      ) =>
        ovhManagerPccDashboardOptionsService
          .getInitialData(
            currentService.name,
            currentUser.ovhSubsidiary,
            currentService.servicePackName,
          )
          .then((model) => {
            const options = uniq(
              reduce(
                model.servicePacks.all,
                (availableOptions, servicePack) => {
                  return availableOptions.concat(
                    map(servicePack.options, (option) => option.name),
                  );
                },
                [],
              ),
            );
            return options;
          }),
      orderDatastore: /* @ngInject */ ($state, usesLegacyOrder) => (
        datacenterId,
      ) =>
        $state.go(
          usesLegacyOrder
            ? 'app.dedicatedCloud.details.datacenter.details.datastores.order-legacy'
            : 'app.dedicatedCloud.details.datacenter.details.datastores.order',
          {
            datacenterId,
          },
        ),
      orderHost: /* @ngInject */ ($state, usesLegacyOrder) => (datacenterId) =>
        $state.go(
          usesLegacyOrder
            ? 'app.dedicatedCloud.details.datacenter.details.hosts.order-legacy'
            : 'app.dedicatedCloud.details.datacenter.details.hosts.order',
          {
            datacenterId,
          },
        ),
      pccType: /* @ngInject */ (dedicatedCloud) =>
        dedicatedCloud.productReference,
      setMessage: /* @ngInject */ (Alerter) => (
        message = false,
        type = 'success',
      ) => {
        Alerter.set(`alert-${type}`, message, null, 'dedicatedCloud');
      },
      trackingPrefix: () => 'dedicated::dedicatedClouds',
      usesLegacyOrder: /* @ngInject */ (currentService) =>
        currentService.usesLegacyOrder,
      surveyUrl: /* @ngInject */ (ovhFeatureFlipping) =>
        ovhFeatureFlipping
          .checkFeatureAvailability('dedicated-cloud:survey')
          .then((featureAvailability) =>
            featureAvailability.isFeatureAvailable('dedicated-cloud:survey')
              ? SURVEY[Environment.getUserLanguage().toUpperCase()] ||
                SURVEY.default
              : null,
          ),
      breadcrumb: /* @ngInject */ (serviceName) => serviceName,
    },
    views: {
      '': 'ovhManagerPcc',
    },
    reloadOnSearch: false,
  });

  // ensure compatibility with links sended by emails
  // like #/configuration/dedicated_cloud/pcc-123456?action=confirmcancel&token=myToken
  // make a redirect to the new url of ui route
  $urlServiceProvider.rules.when(
    '/configuration/dedicated_cloud/:productId?action&token',
    (match) => {
      if (match.action === 'confirmcancel') {
        return `/configuration/dedicated_cloud/${match.productId}/terminate-confirm?token=${match.token}`;
      }

      return false;
    },
  );
};
