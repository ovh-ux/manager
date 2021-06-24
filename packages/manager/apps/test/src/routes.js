export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app', {
    url: '/?target',
    resolve: {
      test: () => Math.random(),
      foo: () => {
        console.log('foo is resolved');
      },
      redirect: ($state, $transition$) => {
        switch ($transition$.params().target) {
          case 'B':
            $state.go('routeA.routeB');
            break;
          case 'C':
            $state.go('routeA.routeB.routeC');
            break;
          default:
            $state.go('routeA');
            break;
        }
      },
    },
  });
};
