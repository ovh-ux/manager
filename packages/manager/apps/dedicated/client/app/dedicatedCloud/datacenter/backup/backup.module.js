import angular from 'angular';
import '@ovh-ux/ng-ovh-swimming-poll';
import '@ovh-ux/ng-translate-async-loader';
import 'ovh-api-services';
import 'ovh-ui-angular';
import 'angular-translate';

import './backup.less';

import component from './backup.component';
import routing from './backup.routing';
import backupService from './backup.service';
import backupOffers from './components/offers';
import backupUpgrade from './upgrade';
import backupNew from './new';
import splaLicence from './splaLicence';

const moduleName = 'ovhManagerDedicatedCloudBackupModule';

angular
  .module(moduleName, [
    'ngOvhSwimmingPoll',
    'ngTranslateAsyncLoader',
    'oui',
    'ovh-api-services',
    'pascalprecht.translate',
    backupOffers,
    backupNew,
    splaLicence,
    backupUpgrade,
  ])
  .config(routing)
  .component('dedicatedCloudDatacenterBackup', component)
  .service('dedicatedCloudDatacenterBackupService', backupService)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
