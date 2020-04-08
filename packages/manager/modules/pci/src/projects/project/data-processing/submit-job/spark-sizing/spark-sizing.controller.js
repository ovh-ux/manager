import {
  MEMORY_OVERHEAD_RATIO,
  MIN_MEMORY_OVERHEAD_MB,
} from './spark-sizing.constants';

export default class {
  /* @ngInject */
  constructor() {
    // let's do some bindings
    this.onClickAdvancedConfigurationHandler = this.onClickAdvancedConfigurationHandler.bind(
      this,
    );
    // create state
    this.state = {};
    this.driverTemplates = null;
    this.workerTemplates = null;
  }

  $onInit() {
    this.minMemoryOverheadMb = MIN_MEMORY_OVERHEAD_MB;
    // initialize component state
    this.state = {
      driverTemplate: '1',
      workerTemplate: '1',
      workerCount: 1,
      workerCores: 1,
      workerMemoryGb: 1,
      workerMemoryOverheadMb: MIN_MEMORY_OVERHEAD_MB,
      driverCores: 1,
      driverMemoryGb: 1,
      driverMemoryOverheadMb: MIN_MEMORY_OVERHEAD_MB,
      advancedSizing: false,
    };
    // update overhead memory from template
    this.updateStateFromTemplate();
  }

  /**
   * Event handler that is called each time component is updated
   * Update component `values` binding to let know our parent component about state update
   * Parent must use `validate` binding to trigger changes.
   */
  $onChanges() {
    Object.assign(this.values, this.state);
    if (this.templates) {
      this.driverTemplates = this.templates;
      this.workerTemplates = this.templates;
    }
  }

  /**
   * Handler for sizing advanced configuration link
   */
  onClickAdvancedConfigurationHandler() {
    if (!this.state.advancedSizing) {
      this.updateStateFromTemplate();
    }
    this.state.advancedSizing = !this.state.advancedSizing;
  }

  /**
   * Use sizing template to update all the individual cores/memory fields of current state
   */
  updateStateFromTemplate() {
    if (this.driverTemplates !== null && this.workerTemplates !== null) {
      const driverTpl = this.driverTemplates[
        parseInt(this.state.driverTemplate, 10) - 1
      ];
      const workerTpl = this.workerTemplates[
        parseInt(this.state.workerTemplate, 10) - 1
      ];
      // compute driver overhead in Mb while ensuring Spark's minimum
      const driverMemoryOverheadMb = Math.max(
        (driverTpl.memory / 1e6) * MEMORY_OVERHEAD_RATIO,
        MIN_MEMORY_OVERHEAD_MB,
      );
      // compute worker overhead in Mb while ensuring Spark's minimum
      const workerMemoryOverheadMb = Math.max(
        (workerTpl.memory / 1e6) * MEMORY_OVERHEAD_RATIO,
        MIN_MEMORY_OVERHEAD_MB,
      );
      Object.assign(this.state, {
        driverCores: driverTpl.cores,
        driverMemoryGb: driverTpl.memory / 1e9,
        driverMemoryOverheadMb,
        workerCores: workerTpl.cores,
        workerMemoryGb: workerTpl.memory / 1e9,
        workerMemoryOverheadMb,
      });
    }
  }

  /**
   * Compute the estimated price /min depending on job sizing.
   * @return {number}
   */
  computePrice() {
    const {
      workerMemoryGb,
      driverMemoryGb,
      workerCount,
      workerMemoryOverheadMb,
      driverMemoryOverheadMb,
      driverCores,
      workerCores,
    } = this.state;
    const pricePerGb = 0; // free during beta
    const pricePerCore = 0; // free during beta
    return (
      (workerMemoryGb + workerMemoryOverheadMb / 1e3) *
        pricePerGb *
        workerCount +
      (driverMemoryGb + driverMemoryOverheadMb / 1e3) * pricePerCore +
      (driverCores + workerCores) * pricePerCore
    );
  }
}
