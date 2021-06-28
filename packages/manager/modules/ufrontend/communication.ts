import { OvhMicroFrontendBaseAPI as BaseApi, TimeoutObject } from './src/api.base.class';
import { uFrontendWindow } from './src/ufrontend';
import { Callback } from './src/utils/deferred.class';

export function emit(data: Record<string, unknown>, opts: TimeoutObject) {
  if ((window as uFrontendWindow).ovhMicroFrontend) {
    const api = new BaseApi((window as uFrontendWindow).ovhMicroFrontend);
    return api.emit(data, opts);
  }
  return null;
}

export function listen(arg0: string | Callback, arg1?: Callback) {
  if ((window as uFrontendWindow).ovhMicroFrontend) {
    const api = new BaseApi((window as uFrontendWindow).ovhMicroFrontend);
    return arg1 ? api.listen(arg0, arg1) : api.listen(arg0);
  }
  return function unbind() { return; };
}
