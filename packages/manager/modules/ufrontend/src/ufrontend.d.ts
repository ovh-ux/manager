import Environment from '@ovh-ux/manager-config/dist/types/environment';
import OvhMicroFrontendApplicationAPI from './api.application.class';
import OvhMicroFrontendFragmentAPI from './api.fragment.class';
import OvhFragment from './fragment.class';
import OvhMicroFrontend from './framework.class';
import { Callback, Reject, Resolve, VoidResolve } from './utils/deferred.class';

export interface FragmentConfig {
  parent?: OvhFragment;
  environment?: Environment;
  ufrontend?: OvhMicroFrontendFragmentAPI | OvhMicroFrontendApplicationAPI;
}

export interface EnvironmentEventMessage {
  data: unknown;
  isExpired: () => boolean | boolean;
  sent: Array<Callback>;
}

export interface FragmentState {
  id: string;
  resolve: Resolve<FragmentConfig> | VoidResolve<FragmentConfig>;
  reject: Reject;
}

interface EnvironmentWebComponents {
  _batchCustomElements: Callback;
  ready: boolean;
  waitFor: Callback;
}

interface EnvironmentWindow extends Window {
  ovhMicroFrontend: OvhMicroFrontend;
  WebComponents: EnvironmentWebComponents;
}

export type uFrontendWindow = EnvironmentWindow & typeof globalThis;
