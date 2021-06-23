import '@webcomponents/webcomponentsjs/webcomponents-loader';
import OvhMicroFrontend from './src/framework.class';
import OvhFragment from './src/fragment.class';
import { FragmentConfig, uFrontendWindow } from './src/ufrontend';


export default function registerApplication(applicationName: string): Promise<FragmentConfig> {
  return new Promise((resolve, reject) => {
    (window as uFrontendWindow).WebComponents.waitFor(() => {
      if (!(window as uFrontendWindow).ovhMicroFrontend) {
        const ufrontend = new OvhMicroFrontend();
        (window as uFrontendWindow).ovhMicroFrontend = ufrontend;
        ufrontend
          .init(applicationName)
          .then(resolve)
          .catch(reject);
      }

      if (!window.customElements.get('ovh-fragment')) {
        window.customElements.define('ovh-fragment', OvhFragment);
      }
    });
  });
}
