import controller from './move-eligibility.controller';
import template from './move-eligibility.html';

export default {
  controller,
  template,
  bindings: {
    offers: '=?',
    offersChange: '&',
    submited: '&',
    method: '=?',
    packName: '<',
    testLine: '<',
  },
};
