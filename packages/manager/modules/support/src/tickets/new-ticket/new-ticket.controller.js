import angular from 'angular';
import get from 'lodash/get';

export default class SupportNewController {
  /* @ngInject */
  constructor($state, $window, CORE_URLS, OvhApiMe, OvhApiSupport, SupportNewTicketService) {
    this.step = 'issues';
    this.$state = $state;
    this.$window = $window;
    this.CORE_URLS = CORE_URLS;
    this.OvhApiMe = OvhApiMe;
    this.OvhApiSupport = OvhApiSupport;
    this.SupportNewTicketService = SupportNewTicketService;
  }

  $onInit() {
    this.guideURL = this.urls.guide;
    this.forumURL = this.urls.forum;
  }

  onIssuesFormSubmit(result) {
    // user found answer, go back to tickets list
    if (result.isSuccess) {
      this.goToTickets();
    // answer was not found, go to ticket creation
    } else {
      this.step = 'creation';
      this.issue = result.issue;
      this.service = result.service;
      this.$window.scrollTo(0, 0);
    }
  }

  onCreationFormSubmit(result) {
    // user validates the form, post the ticket
    if (result.isSuccess) {
      this.step = 'creating';
      this.SupportNewTicketService.createTicket(
        result.issue,
        result.subject,
        get(this.service, 'serviceName'),
        get(result, 'urgency'),
      ).then(({ ticketId }) => {
        this.step = 'created';
        this.ticketId = ticketId;
      }).catch((error) => {
        this.error = {
          message: (error.data || { message: error.statusText }).message,
        };
        if (angular.isFunction(error.headers)) {
          this.error.queryId = error.headers('x-ovh-queryid');
        }
        this.step = 'error';
      });
    // user cancelled the form, go back to tickets list
    } else {
      this.step = 'issues';
      this.issue = null;
    }
  }
}
