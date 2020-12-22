import { buildURL } from '@ovh-ux/ufrontend/url-builder';

const MESSAGES_CONTAINER_NAME = 'pci.projects.project.failover-ips';

export default class FailoverIpController {
  /* @ngInject */
  constructor(
    $state,
    $translate,
    CucCloudMessage,
    OvhApiCloudProjectIpFailover,
  ) {
    this.$state = $state;
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.OvhApiCloudProjectIpFailover = OvhApiCloudProjectIpFailover;

    this.DEDICATED_IPS_URL = buildURL('dedicated', '#/configuration/ip');
  }

  $onInit() {
    this.messageHandler = this.CucCloudMessage.subscribe(
      MESSAGES_CONTAINER_NAME,
      {
        onMessage: () => this.refreshMessage(),
      },
    );
  }

  refreshMessage() {
    this.messages = this.messageHandler.getMessages();
  }
}
