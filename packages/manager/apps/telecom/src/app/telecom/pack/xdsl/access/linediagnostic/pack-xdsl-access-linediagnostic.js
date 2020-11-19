angular
  .module('managerApp')
  .config(($stateProvider) => {
    $stateProvider.state('telecom.packs.pack.xdsl.line.line-diagnostic', {
      url: '/lineDiagnostic?type',
      views: {
        'accessView@telecom.packs.pack.xdsl.line': {
          templateUrl:
            'app/telecom/pack/xdsl/access/linediagnostic/pack-xdsl-access-linediagnostic.html',
          controller: 'PackxdslaccesslinediagnosticCtrl',
          controllerAs: 'PackxdslaccesslinediagnosticCtrl',
        },
      },
      resolve: {
        breadcrumb: /* @ngInject */ ($translate) =>
          $translate.instant('pack_xdsl_access_linediagnostic'),
      },
    });
  })
  .run(/* @ngTranslationsInject:json ./translations */);
