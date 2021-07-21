import 'whatwg-fetch';
import Environment from './environment';
import { Region } from './types/ovhLanguages';

export const HOSTNAME_REGIONS: Record<string, Region> = {
  'www.ovh.com': Region.EU,
  'ca.ovh.com': Region.CA,
  'us.ovhcloud.com': Region.US,
};

export { default as Environment } from './environment';
export {
  convertLanguageFromOVHToBCP47,
  detectUserLocale,
  findLanguage,
  findAvailableLocale,
} from './locale';

export { LANGUAGES } from './locale/locale.constants';

export const fetchConfiguration = async (applicationName: string) => {
  let environment = new Environment();
  let configurationURL = '/engine/2api/configuration';
  if (applicationName) {
    environment.setApplicationName(applicationName);
    configurationURL = `${configurationURL}?app=${encodeURIComponent(
      applicationName,
    )}`;
  }
  try {
    const response = await fetch(configurationURL, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    });
    if (response.status === 401) {
      window.location.assign(
        `/auth?action=disconnect&onsuccess=${encodeURIComponent(
          window.location.href,
        )}`,
      );
    }
    const config = await response.json();
    environment.setRegion(config.region);
    environment.setUser(config.user);
    environment.setApplicationURLs(config.applicationURLs);
    environment.setUniverse(config.universe);
    environment.setMessage(config.message);
    return environment;
  } catch (e) {
    environment = new Environment();
    environment.setRegion(HOSTNAME_REGIONS[window.location.hostname]);
    return environment;
  }
};
