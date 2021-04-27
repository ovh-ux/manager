import registerApplication from '@ovh-ux/ufrontend/application';
import {
  attach as attachPreloader,
  detach as detachPreloader,
  displayMessage,
} from '@ovh-ux/manager-preloader';
import { findAvailableLocale, detectUserLocale } from '@ovh-ux/manager-config';

attachPreloader(findAvailableLocale(detectUserLocale()));

registerApplication('hub').then(({ environment }) => {
  if (environment.getMessage()) {
    displayMessage(environment.getMessage(), environment.getUserLanguage());
  }
  import('./app.jsx').finally(detachPreloader);
});
