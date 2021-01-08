import { BillingService as Service } from '@ovh-ux/manager-models';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.dedicated.server.dashboard.resiliation', {
    url: '/resiliation',
    views: {
      'tabView@app.dedicated.server': {
        component: 'ovhManagerBillingResiliation',
      },
    },
    resolve: {
      availableStrategies: /* @ngInjecgt */ (endStrategyEnum, service) =>
        endStrategyEnum
          .filter((strategy) =>
            service.billing.engagement?.endRule.possibleStrategies.includes(
              strategy,
            ),
          )
          .map((strategy) => ({
            strategy,
          })),
      displayErrorMessage: /* @ngInject */ (Alerter) => (message) =>
        Alerter.set('alert-danger', message),
      endStrategies: /* @ngInject */ (endStrategyEnum) =>
        endStrategyEnum.reduce(
          (object, strategy) => ({
            ...object,
            [strategy]: strategy,
          }),
          {},
        ),
      endStrategyEnum: /* @ngInject */ ($http) =>
        $http
          .get('/services.json')
          .then(
            ({ data }) =>
              data.models['services.billing.engagement.EndStrategyEnum']?.enum,
          ),
      goBack: /* @ngInject */ (goToDashboard) => goToDashboard,
      onSuccess: /* @ngInject */ (goBack) => (successMessage) =>
        goBack(successMessage),
      serviceId: /* @ngInject */ (serviceInfos) => serviceInfos.serviceId,
      serviceName: /* @ngInject */ ($transition$) =>
        $transition$.params().productId,
      service: /* @ngInject */ ($http, serviceId) =>
        $http
          .get(`/services/${serviceId}`)
          .then(({ data }) => new Service(data)),
    },
  });
};
