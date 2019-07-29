import { CONFIG_FILENAME, KUBECONFIG_URL, KUBECTL_URL } from './service.constants';
import { STATUS } from '../constants';

export default class KubernetesServiceCtrl {
  /* @ngInject */
  constructor(
    $scope,
    $state,
    $translate,
    CucCloudMessage,
    CucControllerHelper,
    CucServiceHelper,
    Kubernetes,
  ) {
    this.$scope = $scope;
    this.$state = $state;
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.CucControllerHelper = CucControllerHelper;
    this.CucServiceHelper = CucServiceHelper;
    this.Kubernetes = Kubernetes;
  }

  $onInit() {
    this.CONFIG_FILENAME = CONFIG_FILENAME;
    this.KUBECONFIG_URL = KUBECONFIG_URL;
    this.KUBECTL_URL = KUBECTL_URL;
    this.STATUS = STATUS;
    this.loadingKubeConfig = false;
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('pci.projects.project.kubernetes.details.service');
    this.messageHandler = this.CucCloudMessage.subscribe('pci.projects.project.kubernetes.details.service', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }

  downloadConfigFile() {
    this.loadingKubeConfig = true;
    return this.getKubeConfig()
      .then((config) => {
        // Set yml extension manually as there is no MIME type yet
        this.CucControllerHelper.constructor
          .downloadContent({ fileContent: config.content, fileName: `${config.fileName}.yml` });
      })
      .catch(error => this.CucServiceHelper.errorHandler('kube_service_file_error')(error))
      .finally(() => { this.loadingKubeConfig = false; });
  }
}
