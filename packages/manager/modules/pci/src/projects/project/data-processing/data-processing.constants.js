export const DATA_PROCESSING_STATUS_TO_CLASS = Object.freeze({
  PENDING: 'warning',
  SUBMITTED: 'warning',
  RUNNING: 'info',
  FAILED: 'error',
  COMPLETED: 'success',
  TERMINATED: 'error',
});

export const DATA_PROCESSING_STATUSES = Object.freeze({
  PENDING: 'Pending',
  SUBMITTED: 'Submitted',
  RUNNING: 'Running',
  FAILED: 'Failed',
  COMPLETED: 'Completed',
  TERMINATED: 'Killed',
});

export const DATA_PROCESSING_API_STATUSES = Object.freeze({
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  RUNNING: 'RUNNING',
  FAILED: 'FAILED',
  COMPLETED: 'COMPLETED',
  TERMINATED: 'TERMINATED',
});

export const DATA_PROCESSING_UI_URL = {
  GRA: 'https://adc.gra.dataconvergence.ovh.com',
  GRA5: 'https://adc.gra.dataconvergence.ovh.com',
};

export const DATA_PROCESSING_GUIDE_URL =
  'https://docs.ovh.com/gb/en/data-processing/';

export default {
  DATA_PROCESSING_STATUS_TO_CLASS,
  DATA_PROCESSING_STATUSES,
  DATA_PROCESSING_UI_URL,
  DATA_PROCESSING_GUIDE_URL,
  DATA_PROCESSING_API_STATUSES,
};

export const METRICS_REFRESH_INTERVAL = 5000;
