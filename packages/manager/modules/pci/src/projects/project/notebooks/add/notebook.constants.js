export const NOTEBOOK_NAME_REGEX = '^[a-z0-9]([-a-z0-9]*[a-z0-9])?$';
export const NOTEBOOK_LABELS = {
  MAX_CHARS: 15,
  MAX_ITEMS: 20,
};
export const NOTEBOOK_PRIVACY_SETTINGS = {
  RESTRICTED: 'restricted',
  PUBLIC: 'public',
};
export const NOTEBOOK_RESOURCES = {
  STANDARD: 'standard', // CPU flavors
  ADVANCED: 'advanced', // GPU flavors
  STANDARD_FLAVOR: 'cpu',
  ADVANCED_FLAVOR: 'gpu',
  NB_RESOURCES: 1,
};
export const NOTEBOOK_ATTACH_STORAGE = {
  MOUNT_PATH_REGEX: '^\\/(\\S)*$',
  PERMISSION_READ_ONLY: 'RO',
  PERMISSION_READ_WRITE: 'RW',
};

export default {
  NOTEBOOK_NAME_REGEX,
  NOTEBOOK_LABELS,
  NOTEBOOK_PRIVACY_SETTINGS,
  NOTEBOOK_RESOURCES,
};