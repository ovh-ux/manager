import {
  BillingService,
  Engagement,
  Commitment,
  Service,
} from '@ovh-ux/manager-models';

export default class {
  /* @ngInject */
  constructor($q, $http) {
    this.$q = $q;
    this.$http = $http;
  }

  getServiceInfos(servicePath) {
    return this.$http
      .get(`${servicePath}/serviceInfos`)
      .then(({ data }) => new BillingService(data));
  }

  getService(serviceId) {
    return this.$http
      .get(`/services/${serviceId}`)
      .then(({ data }) => new Service(data));
  }

  getEngagement(serviceId) {
    return this.$http
      .get(`/services/${serviceId}/billing/engagement`)
      .then(({ data }) => new Engagement(data))
      .catch((error) => (error.status === 404 ? null : this.$q.reject(error)));
  }

  getOptions(serviceId) {
    return this.$http
      .get(`/services/${serviceId}/options`)
      .then(({ data }) => data.map((option) => new Service(option)));
  }

  getAvailableEngagement(serviceId) {
    return this.$http
      .get(`/services/${serviceId}/billing/engagement/available`)
      .then(({ data }) => data)
      .then((commitments) => commitments.map((c) => new Commitment(c)));
  }

  getPendingEngagement(serviceId) {
    return this.$http
      .get(`/services/${serviceId}/billing/engagement/request`)
      .then(({ data }) => data);
  }
}
