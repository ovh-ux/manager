import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import registerApplication from '@ovh-ux/ufrontend/application';
import {
  attach as attachPreloader,
  detach as detachPreloader,
  displayMessage,
} from '@ovh-ux/manager-preloader';
import { findAvailableLocale, detectUserLocale } from '@ovh-ux/manager-config';
import appContext from 'src/context';

attachPreloader(findAvailableLocale(detectUserLocale()));

registerApplication('hub').then(({ environment }) => {
  if (environment.getMessage()) {
    displayMessage(environment.getMessage(), environment.getUserLanguage());
  }
  const locale = environment.getUserLocale();
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: 'en',
  });
  appContext.setEnvironment(environment);
  import('./app.jsx').finally(detachPreloader);
});
