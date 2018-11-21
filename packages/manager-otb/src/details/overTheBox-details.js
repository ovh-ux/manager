import angular from 'angular';
import constant from './overTheBox-details.constant';
import controller from './overTheBox-details.controller';
import overTheBoxGraphService from './overTheBox-details.service';
import overTheBoxWarningNotActivated from '../warning/overTheBox-warning-notActivated.html';
import template from './overTheBox-details.html';

const moduleName = 'ovhManagerOtbDetails';

angular.module(moduleName, [])
  .constants('OVERTHEBOX_DETAILS', constant)
  .run(($templateCache) => {
    // import templates required by ng-include
    $templateCache.put('app/telecom/overTheBox/warning/overTheBox-warning-notActivated.html', overTheBoxWarningNotActivated);
  })
  .config(($stateProvider) => {
    $stateProvider.state('telecom.overTheBox.details', {
      url: '/details',
      views: {
        'otbView@telecom.overTheBox': {
          template,
          controller,
          controllerAs: 'OverTheBoxDetails',
        },
      },
      translations: ['.', '../warning', '../remote'],
    });
  })
  .service(overTheBoxGraphService);

export default moduleName;
