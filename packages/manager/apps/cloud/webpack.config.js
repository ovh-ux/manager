const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');
const webpack = require('webpack'); // eslint-disable-line
const webpackConfig = require('@ovh-ux/manager-webpack-config');

const folder = './client/app';
const bundles = {};

fs.readdirSync(folder).forEach((file) => {
  // skip config folder, it'll be added later depending on current environment
  if (file === 'config') {
    return;
  }
  const stats = fs.lstatSync(`${folder}/${file}`);
  if (stats.isDirectory()) {
    const jsFiles = glob.sync(`${folder}/${file}/**/!(*.spec|*.mock).js`);
    if (jsFiles.length > 0) {
      bundles[file] = jsFiles;
    }
  }
});

module.exports = (env = {}) => {
  const REGION = process.env.REGION ? process.env.REGION.toUpperCase() : 'EU';

  const { config } = webpackConfig({
    template: './client/index.html',
    basePath: './client',
    lessPath: [
      './client/app',
      './client/components',
      './node_modules',
    ],
    lessJavascriptEnabled: true,
    root: path.resolve(__dirname, './client/app'),
    assets: {
      files: [
        { from: path.resolve(__dirname, './client/assets'), to: 'assets' },
        { from: path.resolve(__dirname, './node_modules/angular-i18n'), to: 'angular-i18n' },
        { from: path.resolve(__dirname, './client/**/*.html'), context: 'client' },
      ],
    },
  }, env);

  // Extra config files
  const extras = glob.sync('./.extras/**/*.js');

  return merge(config, {
    entry: _.assign({
      main: './client/app/index.js',
      components: glob.sync('./client/components/**/!(*.spec|*.mock).js'),
      config: [
        `./client/app/config/all.${REGION.toLowerCase()}.js`,
        `./client/app/config/${env.production ? 'prod' : 'dev'}.${REGION.toLowerCase()}.js`,
      ],
    }, bundles, extras.length > 0 ? { extras } : {}),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].bundle.js',
    },
    resolve: {
      modules: [
        './node_modules',
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../../../node_modules'),
      ],
      // alias: {
      //   jquery: path.resolve(__dirname, 'node_modules/jquery'),
      // },
    },
    plugins: [
      new webpack.DefinePlugin({
        __WEBPACK_REGION__: `'${REGION}'`,
      }),
    ],
  });
};
