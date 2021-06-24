export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app', {
    url: '/?target',
    redirectTo: (trans) => {
      return trans
        .injector()
        .getAsync('test')
        .then((test) => {
          console.log(`:::: EXECUTE RedirectTo (${test})`);
          let state = 'routeA';
          switch (trans.params().target) {
            case 'B':
              state = 'routeA.routeB';
              break;
            case 'C':
              state = 'routeA.routeB.routeC';
              break;
            default:
            // do nothing
          }
          console.log('redirectTo:', state);
          return { state };
        });
    },
    resolve: {
      test: () => Math.random(),
    },
  });
};
