import angular from 'angular';

import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import uiRouter from '@uirouter/angularjs';
import angularTranslate from 'angular-translate';

import moveAddress from './address';
import moveBuildingDetails from './building-details';
import moveEligibility from './eligibility';
import moveMeeting from './meeting';
import moveOffers from './offers';
import moveResume from './resume';
import moveServiceDelete from './service-delete';
import moveShipping from './shipping';
import moveUnbundling from './unbundling';

import component from './pack-move.component';
import routing from './pack-move.routing';

const moduleName = 'ovhManagerTelecomPackMove';

angular
  .module(moduleName, [
    ngTranslateAsyncLoader,
    uiRouter,
    angularTranslate,
    moveAddress,
    moveBuildingDetails,
    moveEligibility,
    moveMeeting,
    moveOffers,
    moveResume,
    moveServiceDelete,
    moveShipping,
    moveUnbundling,
  ])
  .component('packMove', component)
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
