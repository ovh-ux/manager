import { FragmentConfig, uFrontendWindow } from "./src/ufrontend";

export default function registerFragment(fragmentId: string): Promise<FragmentConfig> {
  if (!/^[\w-]+$/.test(fragmentId) || fragmentId === 'application') {
    return Promise.reject(new Error(`invalid fragment id '${fragmentId}'`));
  }
  return new Promise((resolve, reject) => {
    (window as uFrontendWindow).ovhMicroFrontend.onFragmentLoaded({
      id: fragmentId,
      resolve,
      reject,
    });
  });
}
