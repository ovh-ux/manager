import isFunction from 'lodash/isFunction';
import includes from 'lodash/includes';
import set from 'lodash/set';

import Ipmi from './ipmi.class';
import Kvm from './kvm.class';

import { getIpmiGuideUrl, ALERT_SECTION } from './constants';

export default class BmServerIpmiController {
  /* @ngInject */
  constructor(
    $sce,
    $translate,
    $window,
    coreConfig,
    IpmiService,
    Polling,
    Alerter,
    $scope,
    $q,
  ) {
    this.$sce = $sce;
    this.$translate = $translate;
    this.$window = $window;
    this.coreConfig = coreConfig;
    this.IpmiService = IpmiService;
    this.Polling = Polling;
    this.Alerter = Alerter;
    this.$scope = $scope;
    this.$q = $q;
  }

  $onInit() {
    this.ttl = '5';
    this.alertSection = ALERT_SECTION;
    this.serviceName = this.server.name;
    this.ipmi = null;
    this.kvm = null;
    this.canOrderKvm = false;

    this.loader = {
      loading: false,
      error: false,
      httpLoading: false,
      httpError: false,
      httpDone: false,
      passwordLoading: false,
      passwordError: false,
      passwordDone: false,
      pingLoading: false,
      pingError: false,
      pingDone: false,

      buttonStart: false,
      navigationLoading: false,
      navigationReady: null,
      javaLoading: false,
      javaReady: false,
      sshLoading: false,
      kvmhtmlLoading: false,
      solSshKeyLoading: false,
      kvm: false,
    };

    this.disable = {
      restartIpmi: false,
      restartSession: false,
      testActive: false,
      testIpmi: false,
      otherTask: false,
      localTask: false,
    };

    this.ssh = {
      list: [],
      error: false,
      selectedKey: '',
    };

    this.ipmiHelpUrl = getIpmiGuideUrl(this.user.ovhSubsidiary);

    this.loader.loading = true;
    this.loader.error = false;
    this.$q
      .all({
        ipmiFeatures: this.loadIpmiFeatures().then(() => {
          if (this.ipmi.isSerialOverLanSshKeySupported()) {
            this.loadSshKey();
          }

          // load kvm features if IPMI is not activated
          if (!this.ipmi.isActivated()) {
            return this.$q
              .all({
                kvmFeatures: this.IpmiService.getKvmFeatures(
                  this.serviceName,
                ).catch((error) => {
                  this.handleError(error, 'bm_server_kvm_error');
                  return {};
                }),
                canOrderKvm: this.IpmiService.canOrderKvm(this.serviceName),
              })
              .then(({ kvmFeatures, canOrderKvm }) => {
                this.kvm = new Kvm(kvmFeatures, canOrderKvm);
              });
          }
          return true;
        }),
        taskInProgress: this.getTaskInProgress(),
      })
      .catch((error) => {
        this.handleError(error, 'bm_server_ipmi_loading_error');
        this.loader.error = true;
      })
      .finally(() => {
        this.loader.loading = false;
      });
  }

  $onDestroy() {
    this.Polling.addKilledScope(this.$scope.$id);
  }

  loadIpmiFeatures() {
    return this.IpmiService.getIpmiFeatures(this.serviceName).then(
      (ipmiFeatures) => {
        const urlkvm = `api/dedicated/server/${this.serviceName}/ipmi/connections/kvmipJnlp`;
        this.ipmi = new Ipmi(
          this.server,
          ipmiFeatures,
          this.$sce.trustAsResourceUrl(urlkvm),
        );
        return this.ipmi;
      },
    );
  }

  loadSshKey() {
    return this.IpmiService.getSshKey()
      .then((keys) => {
        this.ssh.error = false;
        this.ssh.list = keys;
      })
      .catch(() => {
        this.ssh.error = true;
      });
  }

  getIpmiNavigation() {
    return this.IpmiService.ipmiGetConnection(
      this.serviceName,
      'serialOverLanURL',
    )
      .then((connect) => {
        this.loader.navigationReady = connect.value;
        this.$window.open(connect.value, '_blank', 'noopener');
        this.handleSuccess('bm_server_ipmi_navigation_success');
      })
      .catch((error) => {
        this.handleError(error, 'bm_server_ipmi_navigation_error');
      })
      .finally(() => {
        this.loader.navigationLoading = false;
        this.loader.buttonStart = false;
      });
  }

  startIpmiTestStatus() {
    this.disable.testActive = true;
    this.disable.testIpmi = true;
  }

  startIpmiPollPing(task) {
    this.startIpmiTestStatus();
    this.setHttpState(false, true, false);
    this.setPasswordState(false, true, false);
    this.setPingState(true, false, false);

    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          this.disable.testIpmi = false;
          return this.setPingState(false, true, false);
        }
        return this.startIpmiPollPing(task);
      })
      .catch(() => {
        this.disable.testIpmi = false;
        this.setPingState(false, false, true);
      });
  }

  // PING
  startIpmiTestPing() {
    this.startIpmiTestStatus();
    this.setHttpState(false, true, false);
    this.setPasswordState(false, true, false);
    this.setPingState(true, false, false);

    return this.IpmiService.ipmiStartTest(this.serviceName, 'ping', this.ttl)
      .then((task) => this.startIpmiPollPing(task))
      .catch((error) => {
        this.disable.testIpmi = false;
        this.setPingState(false, false, false);
        this.handleError(error, 'bm_server_ipmi_loading_error');
      });
  }

  startIpmiPollPassword(task) {
    this.startIpmiTestStatus();
    this.setHttpState(false, true, false);
    this.setPasswordState(true, false, false);

    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          this.setPasswordState(false, true, false);
          return this.startIpmiTestPing();
        }
        return this.startIpmiPollPassword(task);
      })
      .catch(() => {
        this.disable.testIpmi = false;
        this.setPasswordState(false, false, true);
      });
  }

  startIpmiTestPassword() {
    this.startIpmiTestStatus();
    this.setHttpState(false, true, false);
    this.setPasswordState(true, false, false);

    return this.IpmiService.ipmiStartTest(
      this.serviceName,
      'password',
      this.ttl,
    )
      .then((task) => this.startIpmiPollPassword(task))
      .catch((error) => {
        this.disable.testIpmi = false;
        this.setPasswordState(false, false, false);
        this.handleError(error, 'bm_server_ipmi_loading_error');
      });
  }

  startIpmiPollHttp(task) {
    this.startIpmiTestStatus();
    this.setHttpState(true, false, false);

    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          this.setHttpState(false, true, false);
          return this.startIpmiTestPassword();
        }
        return this.startIpmiPollHttp(task);
      })
      .catch(() => {
        this.disable.testIpmi = false;
        this.setHttpState(false, false, true);
      });
  }

  startIpmiTestHttp() {
    this.startIpmiTestStatus();
    this.setHttpState(true, false, false);

    return this.IpmiService.ipmiStartTest(this.serviceName, 'http', this.ttl)
      .then((task) => this.startIpmiPollHttp(task))
      .catch((error) => {
        this.setHttpState(false, false, false);
        this.disable.testIpmi = true;
        this.handleError(error, 'bm_server_ipmi_loading_error');
      });
  }

  startIpmiPollSessionsReset(task) {
    this.loader.navigationReady = null;
    this.loader.javaReady = false;
    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          this.disable.restartSession = false;
          this.disable.localTask = false;
          this.handleSuccess('bm_server_ipmi_sessions_success');
        } else {
          this.startIpmiPollSessionsReset(task);
        }
      })
      .catch((error) => {
        this.disable.restartSession = false;
        this.disable.localTask = false;
        this.handleError(error, 'bm_server_ipmi_restart_error_task_session');
      });
  }

  startIpmiPollRestart(task) {
    this.loader.navigationReady = null;
    this.loader.javaReady = false;
    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          this.disable.restartIpmi = false;
          this.disable.localTask = false;
          this.handleSuccess('bm_server_ipmi_restart_success');
        } else {
          this.startIpmiPollRestart(task);
        }
      })
      .catch((error) => {
        this.disable.restartIpmi = false;
        this.disable.localTask = false;
        this.handleError(error, 'bm_server_ipmi_restart_error_task');
      });
  }

  getTaskInProgress() {
    return this.IpmiService.getTaskInProgress(
      this.serviceName,
      'hardReboot',
    ).then((hardRebootTasks) => {
      if (hardRebootTasks.length === 0) {
        return this.$q.all({
          resetIPMISession: this.IpmiService.getTaskInProgress(
            this.serviceName,
            'resetIPMISession',
          ).then((tasks) => {
            if (tasks.length > 0) {
              this.disable.localTask = true;
              this.disable.restartSession = true;
              this.startIpmiPollSessionsReset(tasks[0]);
            }
            return true;
          }),
          resetIPMI: this.IpmiService.getTaskInProgress(
            this.serviceName,
            'resetIPMI',
          ).then((tasks) => {
            if (tasks.length > 0) {
              this.disable.localTask = true;
              this.disable.restartIpmi = true;
              this.startIpmiPollRestart(tasks[0]);
            }
            return true;
          }),
          testIPMIhttp: this.IpmiService.getTaskInProgress(
            this.serviceName,
            'testIPMIhttp',
          ).then((testIpmiHttpTasks) => {
            if (testIpmiHttpTasks.length > 0) {
              this.startIpmiPollHttp(testIpmiHttpTasks[0]);
            } else {
              return this.IpmiService.getTaskInProgress(
                this.serviceName,
                'testIPMIpassword',
              ).then((testIpmiPasswordTasks) => {
                if (testIpmiPasswordTasks.length > 0) {
                  this.startIpmiPollPassword(testIpmiPasswordTasks[0]);
                } else {
                  return this.IpmiService.getTaskInProgress(
                    this.serviceName,
                    'testIPMIping',
                  ).then((testIpmiPingTasks) => {
                    if (testIpmiPingTasks.length > 0) {
                      this.startIpmiPollPing(testIpmiPingTasks[0]);
                    }
                    return true;
                  });
                }
                return true;
              });
            }
            return true;
          }),
        });
      }
      this.disable.otherTask = true;
      return true;
    });
  }

  startIpmiPollNavigation(task) {
    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          return this.getIpmiNavigation();
        }
        return this.startIpmiPollNavigation(task);
      })
      .catch((error) => {
        this.loader.navigationLoading = false;
        this.loader.buttonStart = false;
        this.handleError(error, 'bm_server_ipmi_navigation_error');
      });
  }

  // ------------Start IPMI------------
  // NAVIGATION
  startIpmiNavigation() {
    this.loader.navigationLoading = true;
    this.loader.buttonStart = true;
    this.loader.navigationReady = null;

    return this.IpmiService.ipmiStartConnection({
      serviceName: this.serviceName,
      type: 'serialOverLanURL',
      ttl: this.ttl,
      ipToAllow: this.ipmi.model.clientIp,
    })
      .then(({ taskId }) => this.startIpmiPollNavigation({ id: taskId }))
      .catch(({ error }) => {
        this.loader.navigationLoading = false;
        this.loader.buttonStart = false;
        this.handleError(error, 'bm_server_ipmi_navigation_error');
      });
  }

  getKvmUrl() {
    return this.IpmiService.ipmiGetConnection(this.serviceName, 'kvmipHtml5URL')
      .then((kvmUrl) => {
        this.loader.kvmUrlReady = true;
        this.loader.kvmUrl = kvmUrl.value;
        this.handleSuccess('bm_server_ipmi_navigation_success');
      })
      .catch((error) => {
        this.handleError(error, 'bm_server_ipmi_navigation_error');
      })
      .finally(() => {
        this.loader.kvmhtmlLoading = false;
        this.loader.buttonStart = false;
      });
  }

  startIpmiKvmUrlPoll(task) {
    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          return this.getKvmUrl();
        }
        return this.startIpmiKvmUrlPoll(task);
      })
      .catch((error) => {
        this.loader.kvmhtmlLoading = false;
        this.loader.buttonStart = false;
        this.handleError(error, 'bm_server_ipmi_navigation_error');
      });
  }

  // ------------Start KVM URL------------
  getIpmiKvmUrl() {
    this.loader.buttonStart = true;
    this.loader.kvmhtmlLoading = true;
    return this.IpmiService.ipmiStartConnection({
      serviceName: this.serviceName,
      type: 'kvmipHtml5URL',
      ttl: this.ttl,
      ipToAllow: this.ipmi.model.clientIp,
    })
      .then(({ taskId }) => {
        this.startIpmiKvmUrlPoll({ id: taskId });
      })
      .catch((error) => {
        this.loader.kvmhtmlLoading = false;
        this.loader.buttonStart = false;
        this.handleError(error, 'bm_server_ipmi_navigation_error');
      });
  }

  getIpmiJava() {
    this.handleSuccess('bm_server_ipmi_java_success');
    this.loader.javaLoading = false;
    this.loader.buttonStart = false;
    this.loader.javaReady = true;

    return this.IpmiService.ipmiGetConnection(this.serviceName, 'kvmipJnlp')
      .then((data) => {
        const fileName = `${this.serviceName.replace(/\./g, '-')}|.jnlp`;
        const blob = new Blob([data.value], {
          type: 'application/x-java-jnlp-file',
        });

        let link;
        let url;
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, fileName);
        } else {
          link = document.createElement('a');
          if (link.download !== undefined) {
            url = window.URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            this.appletToDownload = encodeURIComponent(data.value);
          }
        }
      })
      .catch((error) => {
        this.handleError(error, 'bm_server_ipmi_java_error');
      });
  }

  startIpmiPollJava(task) {
    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          return this.getIpmiJava();
        }
        return this.startIpmiPollJava(task);
      })
      .catch((error) => {
        this.loader.javaLoading = false;
        this.loader.buttonStart = false;
        this.handleError(error, 'bm_server_ipmi_java_error');
      });
  }

  startIpmiJava() {
    this.loader.javaReady = false;
    this.loader.javaLoading = true;
    this.loader.buttonStart = true;
    const withGeolocation =
      !includes(['HIL_1', 'VIN_1'], this.server.datacenter) &&
      this.coreConfig.isRegion('US');
    return this.IpmiService.ipmiStartConnection({
      serviceName: this.serviceName,
      type: 'kvmipJnlp',
      ttl: this.ttl,
      ipToAllow: this.ipmi.model.clientIp,
      withGeolocation,
    })
      .then(({ taskId }) => {
        this.startIpmiPollJava({ id: taskId });
      })
      .catch((error) => {
        this.loader.javaLoading = false;
        this.loader.buttonStart = false;
        this.handleError(error, 'bm_server_ipmi_java_error');
      });
  }

  downloadApplet() {
    this.$window.open(
      `data:application/x-java-jnlp-file,${this.appletToDownload}`,
    );
  }

  // ------------Test IPMI------------
  startIpmiTest() {
    this.setHttpState(false, false, false);
    this.setPasswordState(false, false, false);
    this.setPingState(false, false, false);
    this.startIpmiTestHttp();
  }

  setHttpState(load, done, error) {
    this.loader.httpLoading = load;
    this.loader.httpDone = done;
    this.loader.httpError = error;
  }

  setPasswordState(load, done, error) {
    this.loader.passwordLoading = load;
    this.loader.passwordDone = done;
    this.loader.passwordError = error;
  }

  setPingState(load, done, error) {
    this.loader.pingLoading = load;
    this.loader.pingDone = done;
    this.loader.pingError = error;
  }

  getSolSsh() {
    return this.IpmiService.ipmiGetConnection(
      this.serviceName,
      'serialOverLanSshKey',
    )
      .then((solSsh) => {
        this.ssh.solSshUrl = solSsh.value;
        this.handleSuccess('bm_server_ipmi_ssh_success');
      })
      .catch((error) => {
        this.handleError(error, 'bm_server_ipmi_ssh_error');
      })
      .finally(() => {
        this.loader.solSshKeyLoading = false;
        this.loader.buttonStart = false;
      });
  }

  startSolSshPolling(task) {
    return this.addTaskFast(this.serviceName, task, this.$scope.$id)
      .then((state) => {
        if (this.Polling.isResolve(state)) {
          return this.getSolSsh();
        }
        return this.startSolSshPolling(task);
      })
      .catch((error) => {
        this.loader.solSshKeyLoading = false;
        this.loader.buttonStart = false;
        this.handleError(error, 'bm_server_ipmi_navigation_error');
      });
  }

  // ---------ACTION SSH SOL------------
  onSelectSshKey() {
    this.loader.buttonStart = true;
    this.loader.solSshKeyLoading = true;
    return this.IpmiService.ipmiStartConnection({
      serviceName: this.serviceName,
      type: 'serialOverLanSshKey',
      ttl: this.ttl,
      sshKey: this.ssh.selectedKey,
      ipToAllow: this.ipmi.model.clientIp,
    })
      .then(({ taskId }) => {
        this.startSolSshPolling({ id: taskId });
      })
      .catch((error) => {
        this.loader.solSshKeyLoading = false;
        this.loader.buttonStart = false;
        this.handleError(error, 'bm_server_ipmi_navigation_error');
      });
  }

  hasSOL() {
    return this.coreConfig.getRegion() !== 'US';
  }

  static getTaskPath(serviceName, taskId) {
    return `apiv6/dedicated/server/${serviceName}/task/${taskId}`;
  }

  addTaskFast(serviceName, task, scopeId) {
    set(task, 'id', task.id || task.taskId);
    const pollPromise = this.$q.defer();

    this.Polling.addTaskFast(
      BmServerIpmiController.getTaskPath(serviceName, task.id),
      task,
      scopeId,
    )
      .then((state) => {
        pollPromise.resolve(state);
      })
      .catch((data) => {
        pollPromise.reject(data);
      });
    return pollPromise.promise;
  }

  isServerHacked() {
    return (
      this.server.state === 'HACKED' || this.server.state === 'HACKED_BLOCKED'
    );
  }

  handleError(error, translationId) {
    this.Alerter.alertFromSWS(
      this.$translate.instant(translationId),
      error.data,
      this.alertSection,
    );
  }

  handleSuccess(translationId) {
    this.Alerter.alertFromSWS(
      this.$translate.instant(translationId),
      true,
      this.alertSection,
    );
  }

  restartIpmi() {
    if (isFunction(this.onIpmiRestart)) {
      this.onIpmiRestart();
    }
  }

  orderKvm() {
    if (isFunction(this.onKvmOrder)) {
      this.onKvmOrder();
    }
  }
}
