import rollupConfig from '@ovh-ux/component-rollup-config';

const config = rollupConfig({
  input: `src/index-${process.env.BUILD === 'production' ? 'prod' : 'dev'}.js`,
});

const esConfig = config.es({
  output: {
    file: 'dist/esm/index.js',
  },
});
delete esConfig.output.dir;

export default [esConfig];
