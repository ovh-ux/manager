import { Environment } from '@ovh-ux/manager-config';
import { buildURL } from '@ovh-ux/ufrontend/url-builder';
import { RENEW_URL, SERVICE_TYPE } from './service-actions.constants';

export default class ServicesActionsCtrl {
  /* @ngInject */
  constructor(atInternet) {
    this.atInternet = atInternet;
    this.autorenewLink = ['EU', 'CA'].includes(Environment.getRegion())
      ? buildURL('dedicated', '#/billing/autorenew')
      : '';

    this.SERVICE_TYPE = SERVICE_TYPE;
  }

  $onInit() {
    this.warningLink = `${this.autorenewLink}/warn-nic?nic=${this.service.contactBilling}`;
    this.billingLink = buildURL('dedicated', '#/billing/history');
    this.updateLink = `${this.autorenewLink}/update?serviceId=${this.service.serviceId}&serviceType=${this.service.serviceType}`;
    this.cancelResiliationLink = `${this.autorenewLink}/cancel-resiliation?serviceId=${this.service.serviceId}&serviceType=${this.service.serviceType}`;
    this.deleteLink = `${
      this.autorenewLink
    }/delete-${this.service.serviceType
      .replace(/_/g, '-')
      .toLowerCase()}?serviceId=${this.service.serviceId}`;

    switch (this.service.serviceType) {
      case SERVICE_TYPE.EXCHANGE:
        this.resiliateLink = `${this.service.url}?action=resiliate`;
        this.renewLink = `${this.service.url}?tab=ACCOUNT`;
        break;
      case SERVICE_TYPE.EMAIL_DOMAIN:
        this.resiliateLink = `${this.autorenewLink}/delete-email?serviceId=${this.service.serviceId}&name=${this.service.domain}`;
        this.cancelResiliationLink = null;
        break;
      case SERVICE_TYPE.SMS:
        this.buyingLink = buildURL('telecom', '#/sms/:serviceName/order', {
          serviceName: this.service.serviceId,
        });
        this.renewLink = buildURL(
          'telecom',
          '#/sms/:serviceName/options/recredit',
          { serviceName: this.service.serviceId },
        );
        break;
      default:
        this.resiliateLink = `${this.autorenewLink}/delete?serviceId=${this.service.serviceId}&serviceType=${this.service.serviceType}`;
        break;
    }
  }

  getRenewUrl() {
    return `${RENEW_URL[this.user.ovhSubsidiary] || RENEW_URL.default}${
      this.service.serviceId
    }`;
  }

  getExchangeBilling() {
    const [organization, exchangeName] = this.service.serviceId.split(
      '/service/',
    );
    return `${this.autorenewLink}/exchange?organization=${organization}&exchangeName=${exchangeName}`;
  }

  trackAction(action) {
    if (this.trackingPrefix) {
      this.atInternet.trackClick({
        name: `${this.trackingPrefix}::action::${action}`,
        type: 'action',
      });
    }
  }
}
