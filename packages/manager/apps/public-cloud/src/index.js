/* eslint-disable import/no-webpack-loader-syntax, import/extensions */
import 'script-loader!jquery';
import angular from 'angular';
import 'script-loader!lodash';
import 'script-loader!jquery-ui/ui/minified/core.min';
import 'script-loader!jquery-ui/ui/minified/widget.min';
import 'script-loader!jquery-ui/ui/minified/mouse.min';
import 'script-loader!jquery-ui/ui/minified/draggable.min';
import 'script-loader!messenger/build/js/messenger.js';
import 'script-loader!messenger/build/js/messenger-theme-future.js';
import 'script-loader!messenger/build/js/messenger-theme-flat.js';
import 'script-loader!jsplumb';
import 'script-loader!angular-ui-validate/dist/validate.js';
/* eslint-enable import/no-webpack-loader-syntax, import/extensions */

import navbar from '@ovh-ux/manager-navbar';
import ovhManagerCore from '@ovh-ux/manager-core';
import ovhManagerPci from '@ovh-ux/manager-pci';
import ngOvhApiWrappers from '@ovh-ux/ng-ovh-api-wrappers';
import ngUiRouterBreadcrumb from '@ovh-ux/ng-ovh-uirouter-breadcrumb';
import ngUiRouterLineProgress from '@ovh-ux/ng-ovh-uirouter-line-progress';

import 'ovh-ui-kit/dist/oui.css';
import 'ovh-ui-kit-bs/dist/ovh-ui-kit-bs.css';

import preload from './components/manager-preload';
import sidebar from './sidebar';

import './assets/theme/index.less';
import './index.scss';

import controller from './index.controller';
import service from './index.service';
import routing from './index.routes';

angular
  .module('ovhStack', [
    ngUiRouterBreadcrumb,
    ngUiRouterLineProgress,
    ovhManagerCore,
    ovhManagerPci,
    ngOvhApiWrappers,
    navbar,
    preload,
    sidebar,
  ])
  .controller('PublicCloudController', controller)
  .service('publicCloud', service)
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);
