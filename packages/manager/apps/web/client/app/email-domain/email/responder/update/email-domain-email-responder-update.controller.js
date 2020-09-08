import get from 'lodash/get';

angular.module('App').controller(
  'EmailsUpdateResponderCtrl',
  class EmailsUpdateResponderCtrl {
    /**
     * Constructor
     * @param $scope
     * @param $stateParams
     * @param $translate
     * @param Alerter
     * @param WucEmails
     * @param UserSessionService
     */
    constructor(
      $scope,
      $stateParams,
      $translate,
      Alerter,
      WucEmails,
      UserSessionService,
    ) {
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.Alerter = Alerter;
      this.WucEmails = WucEmails;
      this.SessionService = UserSessionService;
    }

    $onInit() {
      this.loading = false;
      this.responder = this.$scope.currentActionData.responder;
      this.model = {
        from: (this.responder.from && moment(this.responder.from)) || '',
        to: (this.responder.to && moment(this.responder.to)) || '',
        content: this.responder.content,
        responderDuration:
          !this.responder.from && !this.responder.to
            ? 'permanent'
            : 'temporary',
      };
      this.model.responderDates = [this.responder.from, this.responder.to];

      this.$scope.updateResponder = () => this.updateResponder();
    }

    responderDurationCheck() {
      return (
        this.model.responderDuration === 'permanent' ||
        (!!this.model.from &&
          !!this.model.to &&
          moment(this.model.to).isAfter(this.model.from) &&
          moment(this.model.to).isAfter(new Date()))
      );
    }

    responderDatesChanged(selectedDates) {
      [this.model.from, this.model.to] = selectedDates;
    }

    updateResponder() {
      this.loading = true;

      const data = {
        content: this.model.content,
        from:
          this.model.responderDuration === 'temporary' && !!this.model.from
            ? moment(this.model.from)
            : null,
        to:
          this.model.responderDuration === 'temporary' && !!this.model.to
            ? moment(this.model.to)
            : null,
      };

      let promise;
      if (get(this.$scope.currentActionData, 'delegate', false)) {
        promise = this.WucEmails.updateDelegatedResponder(
          `${this.responder.account}@${this.$stateParams.productId}`,
          data,
        );
      } else {
        promise = this.WucEmails.updateResponder(
          this.$stateParams.productId,
          this.responder.account,
          data,
        );
      }

      return promise
        .then(() =>
          this.Alerter.success(
            this.$translate.instant('email_tab_modal_update_responder_success'),
            this.$scope.alerts.main,
          ),
        )
        .catch((err) =>
          this.Alerter.alertFromSWS(
            this.$translate.instant('email_tab_modal_update_responder_error'),
            get(err, 'data', err),
            this.$scope.alerts.main,
          ),
        )
        .finally(() => {
          this.loading = false;
          this.$scope.resetAction();
        });
    }
  },
);
