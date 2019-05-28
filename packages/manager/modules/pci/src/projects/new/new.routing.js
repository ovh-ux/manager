import find from 'lodash/find';
import get from 'lodash/get';
import map from 'lodash/map';
import merge from 'lodash/merge';

import { PCI_REDIRECT_URLS } from '../../constants';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.new', {
      url: '/new?description&projectId',
      views: {
        '@pci': {
          component: 'pciProjectNew',
        },
      },
      redirectTo: (transition) => {
        const newProjectInfoPromise = transition.injector().getAsync('newProjectInfo');
        return newProjectInfoPromise
          .then(({ error }) => {
            if (error) {
              return transition.router.stateService.target(
                'pci.error',
                merge({
                  context: 'projectCreation',
                }, error), {
                  location: false,
                },
              );
            }

            return null;
          });
      },
      resolve: {
        breadcrumb: () => null,
        contracts: /* @ngInject */ ($q, newProjectInfo, PciProjectNewService) => {
          const agreementPromises = map(
            newProjectInfo.agreements || [],
            id => PciProjectNewService.getNewProjectAgreementContract(id)
              .then(contract => Object.assign(contract, {
                id,
              })),
          );

          return $q.all(agreementPromises);
        },
        paymentStatus: /* @ngInject */ $transition$ => get($transition$.params(), 'hiPayStatus')
            || get($transition$.params(), 'paypalAgreementStatus'),
        getCurrentStep: /* @ngInject */ ($state, getStepByName) => () => {
          if ($state.current.name === 'pci.projects.new') {
            return getStepByName('description');
          }

          return getStepByName('payment');
        },
        getStepByName: /* @ngInject */ steps => stepName => find(steps, {
          name: stepName,
        }),
        getStateLink: /* ngInject */ ($state, getCurrentStep) => (action) => {
          switch (action) {
            case 'cancel':
              return $state.href('pci.projects');
            case 'credits':
              return $state.href('pci.projects.new.payment', {
                mode: action,
              });
            case 'payment':
              return $state.href('pci.projects.new.payment', {
                mode: null,
              });
            default:
              if (getCurrentStep().name === 'description') {
                return $state.href('pci.projects.new.payment');
              }

              return $state.href('pci.projects');
          }
        },
        hasCreditToOrder: /* @ngInject */ (getCurrentStep, newProjectInfo, paymentStatus) => () => {
          const currentStep = getCurrentStep();

          return newProjectInfo.order
            && ((!paymentStatus && currentStep.model.defaultPaymentMethod)
            || ['success', 'accepted'].includes(paymentStatus)
            );
        },
        dlpStatus: /* @ngInject */ ($q, PciProjectNewService) => PciProjectNewService
          .getDlpStatus()
          .catch((error) => {
            if (error.status === 404) {
              return null;
            }
            return $q.reject(error);
          }),
        paymentMethodUrl: /* @ngInject */ coreConfig => get(
          PCI_REDIRECT_URLS,
          `${coreConfig.getRegion()}.paymentMethods`,
        ),
        newProjectInfo: /* @ngInject */ ($timeout, coreConfig, ovhPaymentMethod,
          paymentStatus, PciProjectNewService) => {
          if (coreConfig.isRegion('US')) {
            return {};
          }
          if (['success', 'accepted'].includes(paymentStatus)) {
            // wait for new payment method validation
            const checkValidPaymentMethod = (iteration = 0) => $timeout(
              () => ovhPaymentMethod.hasDefaultPaymentMethod(),
              iteration * 1000,
            )
              .then((hasDefaultPaymentMethod) => {
                if (!hasDefaultPaymentMethod && iteration < 10) {
                  return checkValidPaymentMethod(iteration + 1);
                }
                return PciProjectNewService.getNewProjectInfo();
              });
            return checkValidPaymentMethod();
          }
          return PciProjectNewService.getNewProjectInfo();
        },
        onDescriptionStepFormSubmit: /* @ngInject */ $state => () => $state.go('pci.projects.new.payment'),
        onProjectCreated: /* @ngInject */ $state => projectId => $state.go(
          'pci.projects.project', {
            projectId,
          },
        ),
        steps: () => [{
          name: 'description',
          loading: {},
          model: {
            name: null,
            agreements: false,
          },
        }, {
          name: 'payment',
          loading: {},
          model: {
            voucher: {
              valid: false,
              value: null,
              paymentMeanRequired: null,
              submitted: false,
            },
            defaultPaymentMethod: null,
            paymentType: null,
            mode: null,
            credit: {
              value: null,
            },
            projectId: null,
          },
        }],
      },
    });
};
