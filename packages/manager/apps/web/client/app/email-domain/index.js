import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'ovhManagerEmailDomainLazyLoading';

angular.module(moduleName, ['ui.router', 'oc.lazyLoad']).config(
  /* @ngInject */ ($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('app.email', {
      url: '/email_domain',
      template: '<div ui-view></div>',
      redirectTo: 'app.email.index',
    });

    $stateProvider.state('app.email.index.**', {
      url: '',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./email.module').then((mod) =>
          $ocLazyLoad.inject(mod.default || mod),
        );
      },
    });

    $stateProvider.state('app.email.domain.**', {
      url: '/:productId',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./dashboard/email-domain.module').then((mod) =>
          $ocLazyLoad.inject(mod.default || mod),
        );
      },
    });

    $urlRouterProvider.when(
      /^\/configuration\/email-domain/,
      /* @ngInject */ ($location) => {
        $location.url($location.url().replace('/configuration', ''));
      },
    );

    $stateProvider.state('app.email-delegate', {
      url: '/email_delegate',
      template: '<div ui-view></div>',
      redirectTo: 'app.email-delegate.index',
    });

    $stateProvider.state('app.email-delegate.index.**', {
      url: '',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./email.module').then((mod) =>
          $ocLazyLoad.inject(mod.default || mod),
        );
      },
    });

    $stateProvider.state('app.email-delegate.dashboard.**', {
      url: '/:productId',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

        return import('./delegate/delegate.module').then((mod) =>
          $ocLazyLoad.inject(mod.default || mod),
        );
      },
    });

    $urlRouterProvider.when(
      /^\/configuration\/email-delegate/,
      /* @ngInject */ ($location) => {
        $location.url($location.url().replace('/configuration', ''));
      },
    );
  },
);
export default moduleName;
