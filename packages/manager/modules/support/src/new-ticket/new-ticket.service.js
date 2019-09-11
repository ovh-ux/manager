export const name = 'SupportNewTicketService';

export const definition = class SupportNewTicketService {
  /* @ngInject */
  constructor($translate, OvhApiMe, OvhApiSupport) {
    this.$translate = $translate;
    this.OvhApiMe = OvhApiMe;
    this.OvhApiSupport = OvhApiSupport;
  }

  getCategories() {
    return this.OvhApiSupport.v6().schema().$promise.then(
      schema => schema.models['support.tickets.CategoryEnum'].enum.map(categoryId => ({
        id: categoryId,
        label: this.$translate.instant(`ovhManagerSupport_new_category_${categoryId}`),
      })),
    );
  }

  getUrgencies() {
    return this.OvhApiSupport.v6().schema().$promise.then(
      schema => schema.models['support.tickets.UrgencyEnum'].enum.map(categoryId => ({
        id: categoryId,
        label: this.$translate.instant(`ovhManagerSupport_new_urgency_${categoryId}`),
      })),
    );
  }

  getSupportLevel() {
    return this.OvhApiMe.v6().supportLevel().$promise;
  }
};

export default {
  name,
  definition,
};
