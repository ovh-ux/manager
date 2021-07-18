import isFunction from 'lodash/isFunction';

export default class ManagerComponentsEditNameController {
  /* @ngInject */
  constructor($http, $log, $translate, $q) {
    this.$http = $http;
    this.$log = $log;
    this.$translate = $translate;
    this.$q = $q;
  }

  $onInit() {
    this.isUpdating = false;

    // either serviceId or (serviceInfoApiUrl and urlParams) is required
    if (this.serviceId || (this.serviceInfoApiUrl && this.urlParams)) {
      this.serviceId = this.getServiceId()
        .then((serviceId) => serviceId)
        .catch((error) => {
          this.$log.warn(
            'Not able to fetch serviceId. Provide valid serviceInfoApiUrl and urlParams.',
          );
          this.handleError(error);
        });
    } else {
      this.$log.warn(
        'Either serviceId or (serviceInfoApiUrl and urlParams) is required',
      );
    }
  }

  saveName() {
    this.isUpdating = true;
    return this.$q
      .when(this.serviceId)
      .then((serviceId) => {
        return this.$http.put(`/service/${serviceId}`, {
          resource: {
            displayName: this.name,
          },
        });
      })
      .then(() => {
        this.handleSuccess(
          this.name,
          this.$translate.instant(
            'server_name_edit_success',
          ),
        )
      })
      .catch((error) => {
        this.handleError(
          error,
          this.$translate.instant(
            'server_name_edit_error',
            {
              message: error.message || error.data?.message,
            }
          ),
        );
      })
      .finally(() => {
        this.isUpdating = false;
      });
  }

  getServiceId() {
    if (this.serviceId) {
      return this.$q.when(this.serviceId);
    }
    return this.$http
      .get(this.constructUrl())
      .then(({ data }) => data.serviceId);
  }

  constructUrl() {
    if (this.serviceInfoApiUrl && this.urlParams) {
      return ServerEditNameController.formatUrl(
        this.serviceInfoApiUrl,
        this.urlParams,
      );
    }
    return null;
  }

  static formatUrl(url, params) {
    return url.replace(
      /(^|\/):(\w+)(?=\/|$)/g,
      (m, g1, g2) => g1 + (params[g2] || m),
    );
  }

  handleCancel() {
    if (isFunction(this.onCancel)) {
      this.onCancel();
    }
  }

  handleError(error, message = null) {
    if (isFunction(this.onError)) {
      this.onError({
        error: { message, data: error }
      });
    }
  }

  handleSuccess(name, message) {
    if (isFunction(this.onSuccess)) {
      this.onSuccess({
        name,
        message,
      });
    }
  }
}
