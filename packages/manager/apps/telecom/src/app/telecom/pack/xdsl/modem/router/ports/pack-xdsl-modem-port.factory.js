import assignIn from 'lodash/assignIn';
import identity from 'lodash/identity';
import isBoolean from 'lodash/isBoolean';
import pick from 'lodash/pick';
import without from 'lodash/without';

angular.module('managerApp').factory('PackXdslModemPortObject', (OvhApiXdsl, $translate, TucToast) => {
  const template = {
    protocol: 'TCP',
    taskId: null,
    name: '',
    externalPortStart: null,
    externalPortEnd: null,
    description: '',
    internalClient: '',
    allowedRemoteIp: '',
    internalPort: null,
    id: null,
  };

  /**
     * Object constructor
     * @param {Object} data Data from APIv6
     */
  const PackXdslModemPortObject = function (data) {
    assignIn(
      this,
      template,
      pick(
        data,
        Object.keys(template),
      ),
    );
  };

  /**
     * Save a port redirection
     * @param {String} serviceName Name of the Xdsl service
     * @return {Promise}
     */
  PackXdslModemPortObject.prototype.save = function (serviceName) {
    const self = this;
    this.busy = true;
    if (this.id) {
      return OvhApiXdsl.Modem().Port().v6().update(
        {
          xdslId: serviceName,
          name: this.name,
        },
        pick(pick(this.tempValue, Object.keys(template)), identity),
      ).$promise.then(() => {
        assignIn(self, self.tempValue);
        self.toggleEdit(false);
        TucToast.success($translate.instant('xdsl_modem_ports_edit_success', { name: self.name }));
        return self;
      }).catch(() => {
        TucToast.error($translate.instant('xdsl_modem_ports_edit_error', { name: self.name }));
      }).finally(() => {
        self.busy = false;
      });
    }
    return OvhApiXdsl.Modem().Port().v6().post(
      {
        xdslId: serviceName,
      },
      pick(pick(this.tempValue, Object.keys(template)), identity),
    ).$promise.then((data) => {
      assignIn(self, pick(data, Object.keys(template)));
      self.toggleEdit(false);
      TucToast.success($translate.instant('xdsl_modem_ports_add_success', { name: self.name }));
      return self;
    }).catch(() => {
      TucToast.error($translate.instant('xdsl_modem_ports_add_error', { name: self.name }));
    }).finally(() => {
      self.busy = false;
    });
  };

  /**
     * delete a port redirection
     * @param {String} serviceName Name of the Xdsl service
     * @return {Promise}
     */
  PackXdslModemPortObject.prototype.remove = function (serviceName) {
    const self = this;
    this.busy = true;
    return OvhApiXdsl.Modem().Port().v6().delete({
      xdslId: serviceName,
      name: this.name,
    }).$promise.then(() => {
      TucToast.success($translate.instant('xdsl_modem_ports_del_success', { name: self.name }));
      return self;
    }).catch(() => {
      TucToast.error($translate.instant('xdsl_modem_ports_del_error', { name: self.name }));
    }).finally(() => {
      self.busy = false;
    });
  };

  /**
     * Cancel edit mode
     */
  PackXdslModemPortObject.prototype.cancel = function () {
    this.toggleEdit(false);
    return this.id;
  };

  /**
     * Enter Edit Mode
     */
  PackXdslModemPortObject.prototype.edit = function () {
    const fields = without(Object.keys(template), 'taskId', 'id');
    this.tempValue = pick(this, fields);
    this.toggleEdit(true);
  };

  /**
     * Toggle edit mode
     * @param {Boolean} state [Optional] if set, for the edit mode state
     * @return {Boolean} new edit mode state
     */
  PackXdslModemPortObject.prototype.toggleEdit = function (state) {
    if (isBoolean(state)) {
      this.editMode = state;
    } else {
      this.editMode = !this.editMode;
    }
    return this.editMode;
  };

  return PackXdslModemPortObject;
});
