export default class SupportController {
  /* @ngInject */
  constructor(
    $rootScope,
    $state,
    OtrsPopupService,
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.OtrsPopupService = OtrsPopupService;
  }

  $onInit() {
    this.$rootScope.$on('ticket.otrs.reload', this.reload.bind(this, { cleanCache: true }));
  }

  openSupport() {
    if (!this.OtrsPopupService.isLoaded()) {
      this.OtrsPopupService.init();
    } else {
      this.OtrsPopupService.toggle();
    }
  }
}
