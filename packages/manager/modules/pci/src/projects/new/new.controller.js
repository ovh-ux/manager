import get from 'lodash/get';
import merge from 'lodash/merge';

export default class PciProjectNewCtrl {
  /* @ngInject */
  constructor($q, $translate, $window, CucCloudMessage,
    ovhPaymentMethod, PciProjectNewService) {
    // dependencies injections
    this.$q = $q;
    this.$translate = $translate;
    this.$window = $window;
    this.CucCloudMessage = CucCloudMessage;
    this.ovhPaymentMethod = ovhPaymentMethod;
    this.PciProjectNewService = PciProjectNewService;

    // other attributes used in view
    this.loading = {
      init: false,
      creating: false,
      addPayment: false,
    };

    this.messages = {
      list: null,
      handler: null,
    };

    this.descriptionModel = null;
    this.paymentModel = null;
  }

  /* ==============================
  =            Helpers            =
  =============================== */

  getNextButtonText() {
    const currentStep = this.getCurrentStep();
    let translationKey;

    if (currentStep.name === 'description') {
      translationKey = 'pci_projects_new_continue';
    } else if (currentStep.model.mode === 'credits') {
      translationKey = 'pci_projects_new_credit_and_create';
    } else if (get(currentStep.model.paymentType, 'paymentType.value') === 'BANK_ACCOUNT') {
      translationKey = 'pci_projects_new_add';
    } else {
      translationKey = 'pci_projects_new_create';
    }

    return this.$translate.instant(translationKey);
  }

  getNextLinkHref() {
    const currentStep = this.getCurrentStep();

    if (currentStep.name === 'description') {
      return this.getStateLink('next');
    }

    return this.paymentMethodUrl;
  }

  isNextButtonDisabled() {
    const currentStep = this.getCurrentStep();

    if (currentStep.name === 'description') {
      return true;
    }

    return this.loading.creating
      || currentStep.loading.init
      || currentStep.loading.availableSteps
      || currentStep.loading.voucher
      || (currentStep.model.mode === 'credits' && !currentStep.model.credit.value);
  }

  isNextButtonVisible() {
    const currentStep = this.getCurrentStep();

    if (currentStep.name === 'description') {
      // for description step - next button is visible when agreements is not checked
      return !currentStep.model.agreements;
    }

    return get(currentStep.model.paymentType, 'paymentType.value') !== 'BANK_ACCOUNT';
  }

  isStepComplete(step) {
    const stepNames = this.steps.map(({ name }) => name);

    return stepNames.indexOf(step.name) < stepNames.indexOf(this.getCurrentStep().name);
  }

  /* ----------  Some payment helpers  ---------- */

  buildPaymentCallbackUrlBase(projectId = null) {
    // first build base of callback urls
    // build from scratch to be sure that old query parameters
    // are reset (in case of previous payment error)
    const { location } = this.$window;
    let callbackUrlBase = `${location.protocol}//${location.host}${location.pathname}${this.getStateLink('payment')}?`;
    const callbackParams = [];

    if (this.descriptionModel.name) {
      callbackParams.push(`description=${this.descriptionModel.name}`);
    }
    if (projectId) {
      callbackParams.push(`projectId=${projectId}`);
    }
    if (this.paymentModel.mode === 'credits' && this.paymentModel.credit.value) {
      callbackParams.push(
        `credit=${this.paymentModel.credit.value}`,
        `mode=${this.paymentModel.mode}`,
      );
    }
    // TODO: manage voucher
    if (callbackParams.length) {
      callbackUrlBase = `${callbackUrlBase}${callbackParams.join('&')}`;
    }

    return callbackUrlBase;
  }

  /* -----  End of Helpers  ------ */

  /* ==============================
  =            Actions            =
  =============================== */

  createProject() {
    this.loading.creating = true;

    const hasCredit = this.paymentModel.mode === 'credits' && this.paymentModel.credit.value;
    const createParams = {
      description: this.descriptionModel.name,
    };

    if (hasCredit) {
      createParams.credit = this.paymentModel.credit.value;
    }

    return this.PciProjectNewService
      .createNewProject(createParams)
      .then(({ orderId, project }) => {
        if (!hasCredit) {
          return this.onProjectCreated(project);
        }

        return this.payCredit({ orderId, project });
      })
      .catch(() => {
        this.loading.creating = false;
        this.CucCloudMessage
          .error(this.$translate.instant('pci_projects_new_create_error_message'));
      });
  }

  payCredit({ orderId, project }) {
    const callbackUrlBase = this.buildPaymentCallbackUrlBase(project);
    const paymentParams = {
      orderId,
      default: false,
      register: false,
      callbackUrl: {
        cancel: [callbackUrlBase, 'hiPayStatus=cancel'].join('&'),
        error: [callbackUrlBase, 'hiPayStatus=error'].join('&'),
        failure: [callbackUrlBase, 'hiPayStatus=failure'].join('&'),
        pending: [callbackUrlBase, 'hiPayStatus=pending'].join('&'),
        success: [callbackUrlBase, 'hiPayStatus=success'].join('&'),
      },
    };

    return this.PciProjectNewService
      .getBillingContact()
      .then(({ id }) => {
        paymentParams.billingContactId = id;
        return true;
      })
      .then(() => {
        const paymentType = {
          paymentType: {
            value: 'CREDIT_CARD',
          },
        };

        return this.ovhPaymentMethod
          .addPaymentMethod(paymentType, paymentParams);
      });
  }

  addPaymentMethod() {
    this.loading.addPayment = true;

    const callbackUrlBase = this.buildPaymentCallbackUrlBase();

    // set the right params depending if it is an original payment method
    // or a new one (with /me/payment/method)
    let addPaymentParams = {
      default: true,
    };
    let billingContactPromise = this.$q.when(true);

    if (!this.paymentModel.paymentType.original) {
      addPaymentParams = merge(addPaymentParams, {
        register: true,
        callbackUrl: {
          cancel: [callbackUrlBase, 'hiPayStatus=cancel'].join('&'),
          error: [callbackUrlBase, 'hiPayStatus=error'].join('&'),
          failure: [callbackUrlBase, 'hiPayStatus=failure'].join('&'),
          pending: [callbackUrlBase, 'hiPayStatus=pending'].join('&'),
          success: [callbackUrlBase, 'hiPayStatus=success'].join('&'),
        },
      });

      billingContactPromise = this.PciProjectNewService
        .getBillingContact()
        .then(({ id }) => {
          addPaymentParams.billingContactId = id;
          return true;
        });
    } else {
      // if it's an "original", it is paypal
      addPaymentParams.returnUrl = callbackUrlBase;
    }

    return billingContactPromise
      .then(() => this.ovhPaymentMethod
        .addPaymentMethod(this.paymentModel.paymentType, addPaymentParams))
      .catch(() => {
        this.loading.addPayment = false;
      });
  }

  /* -----  End of Actions  ------ */

  /* =============================
  =            Events            =
  ============================== */

  onNextBtnClick() {
    // if default payment or credit amount - create project
    if (this.paymentModel.defaultPaymentMethod
      || (this.paymentModel.mode === 'credits' && this.paymentModel.credit.value)) {
      return this.createProject();
    }

    // if no default payment mehtod - add new one before creating project
    return this.addPaymentMethod();
  }

  /* -----  End of Events  ------ */

  /* =====================================
  =            Initialization            =
  ====================================== */

  $onInit() {
    // set models
    this.descriptionModel = this.getStepByName('description').model;
    this.paymentModel = this.getStepByName('payment').model;

    // manage messages
    this.CucCloudMessage.unSubscribe('pci.projects.new');
    this.messages.handler = this.CucCloudMessage.subscribe('pci.projects.new', {
      onMessage: () => {
        this.messages.list = this.messages.handler.getMessages();
      },
    });

    if (this.paymentStatus === 'success' || this.paymentStatus === 'accepted') {
      // success => HiPay
      // accepted => PayPal
      if (!this.paymentModel.projectId) {
        // if no projectId - this mean that project is not yet created
        // and that a new payment method has been added
        return this.createProject();
      }

      // if projectId - this mean that project has been created with credit
      // and payment of this credit is OK
      return this.onProjectCreated(this.paymentModel.projectId);
    }

    if (this.paymentStatus) {
      if (!this.paymentModel.projectId) {
        // just explain that payment has failed
        this.CucCloudMessage.error(this.$translate.instant('pci_projects_new_add_payment_error_message'));
      } else {
        // explain that project has been created
        // but that credit needs to be paid before using it
        this.CucCloudMessage.error(this.$translate.instant('pci_projects_new_add_credit_payment_error_message'));
      }
    }

    return true;
  }

  /* -----  End of Initialization  ------ */
}
