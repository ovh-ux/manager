import 'script-loader!jquery'; // eslint-disable-line
import 'script-loader!lodash'; // eslint-disable-line

import angular from 'angular';
import '@ovh-ux/manager-kubernetes';

angular.module('kubernetesApp', ['ovhManagerKubernetes']);
