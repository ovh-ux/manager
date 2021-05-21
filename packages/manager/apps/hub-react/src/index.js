import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import registerApplication from '@ovh-ux/ufrontend/application';
import {
  attach as attachPreloader,
  displayMessage,
} from '@ovh-ux/manager-preloader';
import { findAvailableLocale, detectUserLocale } from '@ovh-ux/manager-config';
import appContext from 'src/context';

attachPreloader(findAvailableLocale(detectUserLocale()));

registerApplication('hub')
  .then(({ environment }) => {
    if (environment.getMessage()) {
      displayMessage(environment.getMessage(), environment.getUserLanguage());
    }
    const locale = environment.getUserLocale();
    i18n
      .use(initReactI18next)
      .use(Backend)
      .init({
        lng: locale,
        fallbackLng: 'fr_FR',
        ns: [], // namespaces to load by default
        backend: {
          // path construction for async load, ns: namespace, lng: locale
          loadPath: '/translations/{{ns}}/{{lng}}.json',
        },
      });
    appContext.setEnvironment(environment);
  })
  .then(() => import('./app.jsx'));
