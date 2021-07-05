import controller from './controller';
import template from './index.html';

export default {
  name: 'serverOsInstallImageConfigDrive',
  bindings: {
    loaders: '<',
    model: '<',
    trackingPrefix: '<',
    server: '<',
  },
  controller,
  template,
};
