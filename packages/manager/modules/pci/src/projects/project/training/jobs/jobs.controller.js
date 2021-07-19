import { getCriteria } from '../../project.utils';

export default class PciTrainingJobController {
  /* @ngInject */
  constructor(
    CucCloudMessage,
    ovhManagerRegionService,
    PciProjectTrainingJobService,
  ) {
    this.CucCloudMessage = CucCloudMessage;
    this.ovhManagerRegionService = ovhManagerRegionService;
    this.PciProjectTrainingJobService = PciProjectTrainingJobService;
  }

  $onInit() {
    this.PciProjectTrainingJobService.getAll(this.projectId).then((jobs) => {
      this.jobList = jobs;
    });
    this.loadMessages();
    this.criteria = getCriteria('id', this.jobId);
  }

  loadMessages() {
    this.messageHandler = this.CucCloudMessage.subscribe(
      'pci.projects.project.training.jobs',
      {
        onMessage: () => this.refreshMessages(),
      },
    );
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}
