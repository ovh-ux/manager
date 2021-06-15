import template from './backups.html';
import controller from './backups.controller';

export default {
  bindings: {
    backupList: '<',
    database: '<',
    projectId: '<',
    goToRestore: '<',
    refreshBackups: '<',
    trackDatabases: '<',
  },
  controller,
  template,
};
