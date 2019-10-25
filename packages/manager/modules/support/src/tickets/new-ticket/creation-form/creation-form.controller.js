import get from 'lodash/get';

export default class SupportNewCreationFormController {
  /* @ngInject */
  constructor(
    $translate,
    SupportNewTicketService,
  ) {
    this.$translate = $translate;
    this.SupportNewTicketService = SupportNewTicketService;
  }

  $onInit() {
    return this.SupportNewTicketService.getSupportLevel().then(({ level }) => {
      this.supportLevel = level;
      if (this.isBusinessSupportLevel()) {
        return this.SupportNewTicketService.getUrgencies().then((urgencies) => {
          this.urgencies = urgencies;
        });
      }
      return level;
    });
  }

  get subject() {
    return get(this.issue, 'subject');
  }

  isBusinessSupportLevel() {
    return ['business', 'enterprise'].indexOf(this.supportLevel) >= 0;
  }

  submitForm(isSuccess) {
    this.onSubmit({
      result: {
        isSuccess,
        issue: this.issue,
        subject: this.subject || this.customSubject,
        urgency: this.urgency,
      },
    });
  }

  computeFieldLabel(field) {
    return field.mandatory
      ? field.label
      /**
       * reduces sanitization to keep special characters (i.e. accented characters)
       * no security issue as the content is generated by the API
       */
      : this.$translate.instant(
        'ovhManagerSupport_new_creation_optional',
        { label: field.label },
        undefined,
        false,
        'sceParameters',
      );
  }
}
