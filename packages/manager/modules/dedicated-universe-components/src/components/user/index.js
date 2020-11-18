import angular from 'angular';

import userController from './user.controller';
import userService from './user.service';
import userSessionController from './session/user-session.controller';
import config from '../../config';

const moduleName = 'dedicatedUniverseUser';

angular
  .module(moduleName, [])
  .constant('Billing.constants', {
    aapiRootPath: config.aapiRootPath,
    swsProxyRootPath: config.swsProxyRootPath,
    paymentMeans: [
      'bankAccount',
      'paypal',
      'creditCard',
      'deferredPaymentAccount',
    ],
    target: config.target,
  })
  .controller('UserCtrl', userController)
  .controller('SessionCtrl', userSessionController)
  .service('User', userService)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
