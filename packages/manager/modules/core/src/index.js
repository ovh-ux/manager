import angular from 'angular';
import set from 'lodash/set';

import 'angular-aria';
import 'angular-sanitize';
import 'angular-resource';

import kebabCase from 'lodash/kebabCase';
import translateAsyncLoader from '@ovh-ux/translate-async-loader';
import OvhHttp from 'ovh-angular-http';
import ssoAuth from 'ovh-angular-sso-auth';
import ovhOuiAngularTranslations from './translate/ovh-ui-angular';

import 'angular-dynamic-locale';
import 'angular-translate';
import 'angular-translate-loader-pluggable';

import 'ovh-angular-apiv7';
import 'ovh-api-services';

import translateServiceProvider from './translate/translate.service';
import sessionService from './session/session.service';

import {
  LANGUAGES, REDIRECT_URLS, URLS,
} from './manager-core.constants';

const moduleName = 'ovhManagerCore';

angular
  .module(moduleName, [
    'ngSanitize',
    'angular-translate-loader-pluggable',
    'ovh-api-services',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    translateAsyncLoader,
    ovhOuiAngularTranslations,
    OvhHttp,
    ssoAuth,
  ])
  .constant('constants', {})
  .constant('CORE_LANGUAGES', LANGUAGES)

  .constant('CORE_REDIRECT_URLS', REDIRECT_URLS)
  // TODO : remove TARGET constant
  // We have to deliver a SPA without any reference to the TARGET, should be managed by the API
  .constant('TARGET', 'EU')
  .constant('CORE_URLS', URLS)
  .provider('TranslateService', translateServiceProvider)
  .config(($translateProvider, translatePluggableLoaderProvider, TranslateServiceProvider) => {
    TranslateServiceProvider.setUserLocale();

    const defaultLanguage = TranslateServiceProvider.getUserLocale();

    $translateProvider.useLoader('translatePluggableLoader');

    translatePluggableLoaderProvider.useLoader('asyncLoader');

    $translateProvider.useLoaderCache(true);
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    $translateProvider.useMissingTranslationHandler('translateMissingTranslationHandler');

    $translateProvider.preferredLanguage(defaultLanguage);
    $translateProvider.use(defaultLanguage);
    $translateProvider.fallbackLanguage(LANGUAGES.fallback);
  })
  .service('SessionService', sessionService)
  // Fix security issue: https://github.com/angular-translate/angular-translate/issues/1418
  .factory('translateMissingTranslationHandler', $sanitize => translationId => $sanitize(translationId))
  .run((tmhDynamicLocaleCache, tmhDynamicLocale, TranslateService) => {
    const injectAngularLocale = lang => tmhDynamicLocaleCache.put(lang, angular.injector(['ngLocale']).get('$locale'));
    const defaultLanguage = TranslateService.getUserLocale();
    const angularLocale = kebabCase(defaultLanguage);

    let angularLocalePromise;
    switch (angularLocale) {
      case 'cs-cz':
        angularLocalePromise = import('angular-i18n/angular-locale_cs-cz.js');
        break;
      case 'de-de':
        angularLocalePromise = import('angular-i18n/angular-locale_de-de.js');
        break;
      case 'en-gb':
      case 'en-asia':
        angularLocalePromise = import('angular-i18n/angular-locale_en-gb.js');
        break;
      case 'en-ca':
        angularLocalePromise = import('angular-i18n/angular-locale_en-ca.js');
        break;
      case 'en-us':
        angularLocalePromise = import('angular-i18n/angular-locale_en-us.js');
        break;
      case 'en-au':
        angularLocalePromise = import('angular-i18n/angular-locale_en-au.js');
        break;
      case 'en-sg':
        angularLocalePromise = import('angular-i18n/angular-locale_en-sg.js');
        break;
      case 'es-es':
        angularLocalePromise = import('angular-i18n/angular-locale_es-es.js');
        break;
      case 'fi-fi':
        angularLocalePromise = import('angular-i18n/angular-locale_fi-fi.js');
        break;
      case 'fr-ca':
        angularLocalePromise = import('angular-i18n/angular-locale_fr-ca.js');
        break;
      case 'it-it':
        angularLocalePromise = import('angular-i18n/angular-locale_it-it.js');
        break;
      case 'lt-lt':
        angularLocalePromise = import('angular-i18n/angular-locale_lt-lt.js');
        break;
      case 'nl-nl':
        angularLocalePromise = import('angular-i18n/angular-locale_nl-nl.js');
        break;
      case 'pl-pl':
        angularLocalePromise = import('angular-i18n/angular-locale_pl-pl.js');
        break;
      case 'pt-pt':
        angularLocalePromise = import('angular-i18n/angular-locale_pt-pt.js');
        break;
      case 'fr-fr':
      default:
        angularLocalePromise = import('angular-i18n/angular-locale_fr-fr.js');
        break;
    }

    angularLocalePromise
      .then(() => injectAngularLocale(angularLocale))
      .then(() => tmhDynamicLocale.set(angularLocale));
  })
  .run((ssoAuthentication/* , User */) => {
    ssoAuthentication.login(); // .then(() => User.getUser());
  })
  .constant('OVH_SSO_AUTH_LOGIN_URL', '/auth')
  .factory('serviceTypeInterceptor', () => ({
    request(config) {
      const localConfig = config;
      if (/^(\/?engine\/)?2api(-m)?\//.test(localConfig.url)) {
        localConfig.url = localConfig.url.replace(/^(\/?engine\/)?2api(-m)?/, '');
        localConfig.serviceType = 'aapi';
      }

      if (/^apiv6\//.test(localConfig.url)) {
        localConfig.url = localConfig.url.replace(/^apiv6/, '');
        localConfig.serviceType = 'apiv6';
      }

      if (/^apiv7\//.test(localConfig.url)) {
        localConfig.url = localConfig.url.replace(/^apiv7/, '');
        localConfig.serviceType = 'apiv7';
      }

      return localConfig;
    },
  }))
  .config((ssoAuthenticationProvider, $httpProvider, OVH_SSO_AUTH_LOGIN_URL) => {
    ssoAuthenticationProvider.setLoginUrl(OVH_SSO_AUTH_LOGIN_URL);
    ssoAuthenticationProvider.setLogoutUrl(`${OVH_SSO_AUTH_LOGIN_URL}?action=disconnect`);

    // if (!constants.prodMode) {
    ssoAuthenticationProvider.setUserUrl('/engine/apiv6/me');
    // }

    ssoAuthenticationProvider.setConfig([
      {
        serviceType: 'apiv6',
        urlPrefix: '/engine/apiv6',
      },
      {
        serviceType: 'aapi',
        urlPrefix: '/engine/2api',
      },
      {
        serviceType: 'apiv7',
        urlPrefix: '/engine/apiv7',
      },
      {
        serviceType: 'ws',
        urlPrefix: '/engine/ws',
      },
    ]);

    $httpProvider.interceptors.push('serviceTypeInterceptor');
    $httpProvider.interceptors.push('ssoAuthInterceptor');
  })
  .config((OvhHttpProvider) => {
    // OvhHttpProvider.rootPath = constants.swsProxyPath;
    set(OvhHttpProvider, 'clearCacheVerb', ['POST', 'PUT', 'DELETE']);
    set(OvhHttpProvider, 'returnSuccessKey', 'data'); // By default, request return response.data
    set(OvhHttpProvider, 'returnErrorKey', 'data'); // By default, request return error.data
  });


export default moduleName;
