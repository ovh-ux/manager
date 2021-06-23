import _Environment from './environment';
import 'whatwg-fetch';

import {
  convertLanguageFromOVHToBCP47 as _convertLanguageFromOVHToBCP47,
  detectUserLocale as _detectUserLocale,
  findLanguage as _findLanguage,
  findAvailableLocale as _findAvailableLocale,
} from './locale';

import { LANGUAGES as _LANGUAGES } from './locale/locale.constants';
import { Region } from './types/ovhLanguages';

export const HOSTNAME_REGIONS: Record<string, Region> = {
  'www.ovh.com': Region.EU,
  'ca.ovh.com': Region.CA,
  'us.ovhcloud.com': Region.US,
};

export const Environment = _Environment;
export const convertLanguageFromOVHToBCP47 = _convertLanguageFromOVHToBCP47;
export const detectUserLocale = _detectUserLocale;
export const findLanguage = _findLanguage;
export const findAvailableLocale = _findAvailableLocale;
export const LANGUAGES = _LANGUAGES;

export const fetchConfiguration = async (applicationName: string) => {
  const environment = new Environment();
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
          window.location.href
        )}`
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
    const environment = new Environment();
    environment.setRegion(HOSTNAME_REGIONS[window.location.hostname]);
    return environment;
  }
};
