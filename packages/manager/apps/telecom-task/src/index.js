import 'script-loader!jquery'; // eslint-disable-line
import 'script-loader!lodash'; // eslint-disable-line

import angular from 'angular';
import ovhManagerTelecomTask from '@ovh-ux/manager-telecom-task';

angular.module('telecomTaskApp', [ovhManagerTelecomTask]);
