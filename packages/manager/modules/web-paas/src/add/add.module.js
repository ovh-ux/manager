import angular from 'angular';
import 'angular-translate';
import modify from '../components/modify-plan';
import routing from './add.routing';

const moduleName = 'ovhManagerWebPaasDetailsServiceAddRange';

angular.module(moduleName, [modify, 'pascalprecht.translate']).config(routing);

export default moduleName;
