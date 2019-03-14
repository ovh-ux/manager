import angular from 'angular';
import get from 'lodash/get';
import includes from 'lodash/includes';
import set from 'lodash/set';

export default class CloudProjectComputeInfrastructureService {
  /* @ngInject */
  constructor(
    $rootScope,
    $state,
    $translate,
    $uibModal,
    CucCloudMessage,
    CucUserPref,
    CloudProjectComputeInfrastructureOrchestrator,
    CucControllerHelper,
    CucServiceHelper,
    TARGET,
  ) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$translate = $translate;
    this.$uibModal = $uibModal;
    this.CucCloudMessage = CucCloudMessage;
    this.CucUserPref = CucUserPref;
    this.CloudProjectComputeInfrastructureOrchestrator = CloudProjectComputeInfrastructureOrchestrator; // eslint-disable-line
    this.CucControllerHelper = CucControllerHelper;
    this.CucServiceHelper = CucServiceHelper;
    this.TARGET = TARGET;
  }

  buyIpFailOver() {
    if (this.TARGET === 'US') {
      return this.$uibModal.open({
        windowTopClass: 'cui-modal',
        templateUrl: 'pci/project/compute/infrastructure/ip/failover/buy/agora.template.html',
        controller: 'CloudProjectComputeInfrastructureIpFailoverBuyAgoraCtrl',
        controllerAs: '$ctrl',
      }).result;
    }
    return this.$uibModal.open({
      windowTopClass: 'cui-modal',
      templateUrl: 'pci/project/compute/infrastructure/ip/failover/buy/template.html',
      controller: 'CloudProjectComputeInfrastructureIpFailoverBuyCtrl',
      controllerAs: 'CPCIIpFailoverBuyCtrl',
    }).result;
  }

  importIpFailOver(pendingImportIps) {
    return this.$uibModal.open({
      windowTopClass: 'cui-modal',
      templateUrl: 'pci/project/compute/infrastructure/ip/failover/import/template.html',
      controller: 'CloudProjectComputeInfrastructureIpFailoverImportCtrl',
      controllerAs: 'CPCIIpFailoverImportCtrl',
      resolve: {
        pendingImportIps: () => angular.copy(pendingImportIps),
      },
    }).result;
  }

  orderCredit() {
    if (this.TARGET === 'US') {
      return this.$uibModal.open({
        windowTopClass: 'cui-modal',
        templateUrl: 'pci/project/billing/vouchers/addCredit/agora.template.html',
        controller: 'CloudProjectBillingVouchersAddcreditAgoraCtrl',
        controllerAs: '$ctrl',
      }).result;
    }
    return null;
  }

  openLoginInformations(vm) {
    return this.$uibModal.open({
      templateUrl: 'pci/project/compute/infrastructure/virtualMachine/loginInformation/template.html',
      controller: 'CloudProjectComputeInfrastructureVirtualMachineLoginInformationCtrl',
      controllerAs: 'VmLoginInformationCtrl',
      size: 'md',
      resolve: {
        params: () => ({
          serviceName: vm.serviceName,
          id: vm.id,
          ipAddresses: vm.ipAddresses,
          image: vm.image,
        }),
      },
    }).result;
  }

  openDeleteProjectModal() {
    return this.$uibModal.open({
      windowTopClass: 'cui-modal',
      templateUrl: 'pci/project/delete/template.html',
      controller: 'CloudProjectDeleteCtrl',
      controllerAs: 'CloudProjectDeleteCtrl',
    }).result;
  }

  openMonthlyConfirmation(vm) {
    this.$uibModal.open({
      windowTopClass: 'cui-modal',
      templateUrl: 'pci/project/compute/infrastructure/virtualMachine/monthlyConfirm/template.html',
      controller: 'CloudProjectComputeInfrastructureVirtualmachineMonthlyConfirm',
      controllerAs: 'CPCIVirtualmachineMonthlyConfirm',
      resolve: {
        params: () => vm,
      },
    }).result.then(() => {
      this.$rootScope.$broadcast('infra.refresh.links');
    });
  }

  openSnapshotWizard(vm) {
    return this.$uibModal.open({
      windowTopClass: 'cui-modal',
      templateUrl: 'pci/project/compute/snapshot/add/template.html',
      controller: 'CloudProjectComputeSnapshotAddCtrl',
      controllerAs: 'CloudProjectComputeSnapshotAddCtrl',
      resolve: {
        params: () => vm,
      },
    }).result;
  }

  openVnc(vm) {
    return this.$uibModal.open({
      windowTopClass: 'cui-modal',
      templateUrl: 'pci/project/compute/infrastructure/virtualMachine/vnc/template.html',
      controller: 'CloudProjectComputeInfrastructureVirtualmachineVncCtrl',
      controllerAs: 'VmVncCtrl',
      size: 'lg',
      resolve: {
        params: () => vm,
      },
    }).result;
  }

  rebootVirtualMachine(vm, type) {
    return this.CucControllerHelper.modal.showConfirmationModal({
      titleText: type === 'hard' ? this.$translate.instant('cpci_vm_action_reboot_hard') : this.$translate.instant('cpci_vm_action_reboot'),
      text: this.$translate.instant('cpci_vm_confirm_reboot', { name: vm.name || '' }),
    }).then(() => this.CloudProjectComputeInfrastructureOrchestrator.rebootVm(vm, type)
      .then(() => this.CucServiceHelper.successHandler('cpci_vm_reboot_submit_success')())
      .catch(this.CucServiceHelper.errorHandler('cpci_vm_reboot_submit_error')));
  }

  reinstallVirtualMachine(vm) {
    return this.CucControllerHelper.modal.showConfirmationModal({
      titleText: this.$translate.instant('cpci_vm_action_reinstall'),
      text: this.$translate.instant('cpci_vm_reinstall_warn'),
    }).then(() => this.CloudProjectComputeInfrastructureOrchestrator.reinstallVm(vm)
      .catch(this.CucServiceHelper.errorHandler('cpci_vm_reinstall_submit_error')));
  }

  deleteVirtualMachine(vm) {
    this.$uibModal.open({
      windowTopClass: 'cui-modal',
      templateUrl: 'pci/project/compute/infrastructure/virtualMachine/delete/template.html',
      controller: 'CloudprojectcomputeinfrastructurevirtualmachinedeleteCtrl',
      controllerAs: '$ctrl',
      resolve: {
        params: () => vm,
      },
    }).result.then(() => this.CloudProjectComputeInfrastructureOrchestrator.deleteVm(vm)
      .catch(this.CucServiceHelper.errorHandler('cpci_vm_delete_submit_error')));
  }

  rescueMode(vm) {
    return this.$uibModal.open({
      windowTopClass: 'cui-modal',
      templateUrl: 'pci/project/compute/infrastructure/virtualMachine/rescue/template.html',
      controller: 'CloudProjectComputeInfrastructureVirtualmachineRescueCtrl',
      controllerAs: 'VmRescueCtrl',
      size: 'md',
      resolve: {
        params: () => vm,
      },
    }).result;
  }

  resumeVirtualMachine(vm) {
    const oldStatus = vm.status;
    set(vm, 'status', 'RESUMING');
    return this.CloudProjectComputeInfrastructureOrchestrator.resumeVm(vm)
      .catch((err) => {
        this.CucCloudMessage.error(`${this.$translate.instant('cpci_vm_resume_submit_error')} ${get(err, 'data.message', '')}`);
        set(vm, 'status', oldStatus);
      });
  }

  stopRescueMode(vm, enable) {
    set(vm, 'confirmLoading', true);
    return this.CloudProjectComputeInfrastructureOrchestrator.rescueVm(vm, enable)
      .then(() => {
        set(vm, 'confirm', null);
      })
      .catch(this.CucServiceHelper.errorHandler('cpci_vm_rescue_end_error'))
      .finally(() => {
        set(vm, 'confirmLoading', false);
      });
  }

  addVirtualMachine() {
    return this.$state.go('iaas.pci-project.compute.infrastructure.diagram', {
      createNewVm: true,
      createNewVolume: false,
      editVm: null,
      monitorVm: null,
    });
  }

  addVolume() {
    return this.$state.go('iaas.pci-project.compute.infrastructure.diagram', {
      createNewVm: false,
      createNewVolume: true,
      editVm: null,
      monitorVm: null,
    });
  }

  editVirtualMachine(vmId) {
    return this.$state.go('iaas.pci-project.compute.infrastructure.diagram', {
      createNewVm: false,
      createNewVolume: false,
      editVm: vmId,
      monitorVm: null,
    });
  }

  monitorVirtualMachine(vmId) {
    return this.$state.go('iaas.pci-project.compute.infrastructure.diagram', {
      createNewVm: false,
      createNewVolume: false,
      editVm: null,
      monitorVm: vmId,
    });
  }

  setPreferredView(view) {
    if (includes(['diagram', 'list'], view)) {
      this.CucUserPref.set('CLOUD_PROJECT_INFRA_PREFERRED_VIEW', {
        view,
      });
    }
  }

  getPreferredView() {
    return this.CucUserPref.get('CLOUD_PROJECT_INFRA_PREFERRED_VIEW')
      .then(view => get(view, 'view', 'diagram'));
  }
}
