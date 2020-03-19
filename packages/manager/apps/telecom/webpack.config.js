const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const webpackConfig = require('@ovh-ux/manager-webpack-config');

function foundNodeModulesFolder(checkedDir, cwd = '.') {
  if (fs.existsSync(`${cwd}/node_modules/${checkedDir}`)) {
    return path.relative(process.cwd(), `${cwd}/node_modules/${checkedDir}`);
  }

  if (path.resolve(cwd) !== '/') {
    return foundNodeModulesFolder(checkedDir, `${cwd}/..`);
  }

  return null;
}

module.exports = (env = {}) => {
  const { config } = webpackConfig(
    {
      template: './src/index.html',
      basePath: './src',
      root: path.resolve(__dirname, './src/app'),
      assets: {
        files: [
          { from: path.resolve(__dirname, './src/assets'), to: 'assets' },
          {
            from: path.resolve(__dirname, './src/app/common/assets'),
            to: 'assets',
          },
          { from: foundNodeModulesFolder('angular-i18n'), to: 'angular-i18n' },
          { from: path.resolve(__dirname, './src/**/*.html'), context: 'src' },
          {
            from: path.resolve(
              __dirname,
              '../../../../node_modules/@ovh-ux/ng-ovh-line-diagnostics/dist/assets',
            ),
            to: 'assets',
          },
        ],
      },
    },
    env,
  );

  // Extra config files
  const extras = glob.sync('./.extras-EU/**/*.js');

  return merge(config, {
    entry: {
      main: path.resolve('./src/app/index.js'),
      ...(extras.length > 0 ? { extras } : {}),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].bundle.js',
    },
    resolve: {
      mainFields: ['module', 'browser', 'main'],
    },
    plugins: [
      new webpack.DefinePlugin({
        WEBPACK_ENV: {
          production: !!env.production,
        },
      }),
    ],
  });
};
