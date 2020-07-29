module.exports = ({ name }) => ({
  name: `@ovh-ux/manager-${name}-app`,
  version: '0.0.0',
  private: true,
  repository: {
    type: 'git',
    url: 'git+https://github.com/ovh/manager.git',
    directory: `packages/manager/apps/${name}`,
  },
  license: 'BSD-3-Clause',
  author: 'OVH SAS',
  scripts: {
    build: 'yarn build:eu && yarn build:ca && yarn build:us',
    'build:ca': "webpack --env.production --env.region='CA' && mv dist dist-CA",
    'build:eu': 'webpack --env.production && mv dist dist-EU',
    'build:us': "webpack --env.production --env.region='US' && mv dist dist-US",
    dev: 'webpack-dev-server',
    'dev:watch': 'yarn run dev',
    start: `lerna exec --stream --scope='@ovh-ux/manager-${name}-app' --include-dependencies -- npm run build --if-present`,
    'start:dev': `lerna exec --stream --scope='@ovh-ux/manager-${name}-app' --include-dependencies -- npm run dev --if-present`,
    'start:watch': `lerna exec --stream --parallel --scope='@ovh-ux/manager-${name}-app' --include-dependencies -- npm run dev:watch --if-present`,
  },
  dependencies: {
    '@ovh-ux/manager-config': '^0.4.0',
    '@ovh-ux/manager-core': '^9.0.0',
    [`@ovh-ux/manager-${name}`]: '^0.0.0',
    '@ovh-ux/ng-ovh-api-wrappers': '^4.0.4',
    '@ovh-ux/ng-ovh-http': '^5.0.0',
    '@ovh-ux/ng-ovh-request-tagger': '^1.1.0',
    '@ovh-ux/ng-ovh-sso-auth': '^4.2.3',
    '@ovh-ux/ng-ovh-swimming-poll': '^5.0.0',
    '@ovh-ux/ui-kit': '^4.1.11',
    '@uirouter/angularjs': '^1.0.23',
    angular: '^1.7.5',
    'angular-aria': '^1.7.8',
    'angular-dynamic-locale': '^0.1.37',
    'angular-i18n': '^1.7.8',
    'angular-cookies': '^1.7.8',
    'angular-resource': '^1.7.8',
    'angular-sanitize': '^1.7.8',
    'angular-translate': '^2.18.1',
    'angular-translate-loader-pluggable': '^1.3.1',
    jquery: '^2.1.3',
    'ovh-api-services': '^9.26.0',
    flatpickr: '~4.5.2',
  },
  devDependencies: {
    '@ovh-ux/manager-webpack-config': '^3.3.0',
    lodash: '^4.17.15',
    'webpack-merge': '^4.2.2',
  },
});
