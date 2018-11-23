import rollupConfig from '@ovh-ux/component-rollup-config';

const config = rollupConfig({
  input: 'src/index.js',
});

export default [
  config.cjs(),
  config.umd({
    output: {
      globals: {
        angular: 'angular',
        telecomUniverseComponents: '@ovh-ux/telecom-universe-components',
      },
    },
  }),
];
