import 'script-loader!jquery'; // eslint-disable-line
import 'script-loader!moment/min/moment-with-locales.min.js'; //eslint-disable-line

import { Environment } from '@ovh-ux/manager-config';
import angular from 'angular';
import 'angular-translate';
import uiRouter, { RejectType } from '@uirouter/angularjs';
import ngOvhUiRouterLineProgress from '@ovh-ux/ng-ui-router-line-progress';
import isString from 'lodash/isString';

import 'ovh-ui-angular';
import ovhManagerCore from '@ovh-ux/manager-core';
import ovhManagerHub from '@ovh-ux/manager-hub';
import ovhManagerNavbar from '@ovh-ux/manager-navbar';
import ovhManagerOrderTracking from '@ovh-ux/ng-ovh-order-tracking';

import get from 'lodash/get';
import has from 'lodash/has';
import head from 'lodash/head';

import atInternet from './components/at-internet';
import errorPage from './components/error-page';
import preload from './components/manager-preload';
import catalog from './catalog';
import dashboard from './dashboard';

import controller from './controller';
import routing from './routing';
import './index.less';
import './index.scss';
import 'ovh-ui-kit/dist/oui.css';

Environment.setRegion(__WEBPACK_REGION__);
Environment.setVersion(__VERSION__);

angular
  .module(
    'managerHubApp',
    [
      'pascalprecht.translate',
      atInternet,
      catalog,
      dashboard,
      errorPage,
      ngOvhUiRouterLineProgress,
      'pascalprecht.translate',
      'oui',
      ovhManagerCore,
      ovhManagerHub,
      ovhManagerNavbar,
      ovhManagerOrderTracking,
      'pascalprecht.translate',
      preload,
      uiRouter,
      __NG_APP_INJECTIONS__,
    ].filter(isString),
  )
  .controller('HubController', controller)
  .config(
    /* @ngInject */ ($locationProvider) => $locationProvider.hashPrefix(''),
  )
  .config(routing)
  .run(
    /* @ngInject */ ($translate, $transitions) => {
      $transitions.onBefore({ to: 'app.**' }, () => $translate.refresh());
    },
  )
  .run(($translate) => {
    moment.locale(head($translate.use().split('_')));
  })
  .run(
    /* @ngInject */ ($state) => {
      $state.defaultErrorHandler((error) => {
        if (error.type === RejectType.ERROR) {
          $state.go(
            'error',
            {
              detail: {
                message: get(error.detail, 'data.message'),
                code: has(error.detail, 'headers')
                  ? error.detail.headers('x-ovh-queryId')
                  : null,
              },
            },
            { location: false },
          );
        }
      });
    },
  )
  .run(
    /* @ngInject */ ($rootScope, $transitions) => {
      $transitions.onSuccess({ to: 'error' }, () => {
        $rootScope.$emit('ovh::sidebar::hide');
      });
    },
  )
  .run(/* @ngTranslationsInject:json ./translations */);
