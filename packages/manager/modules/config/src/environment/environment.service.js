import { ALLOWED_REGIONS, DEFAULT_REGION } from './environment.constants';
import {
  detectUserLocale,
  findAvailableLocale,
  saveUserLocale,
} from '../locale';

export default class EnvironmentService {
  constructor() {
    this.region = DEFAULT_REGION;
    this.userLocale = findAvailableLocale(detectUserLocale(), this.region);
    this.version = null;
    this.user = {};
    this.applicationURLs = {};
  }

  setRegion(region = DEFAULT_REGION) {
    if (!ALLOWED_REGIONS.includes(region)) {
      throw new Error(`Region ${region} is not allowed`);
    }
    this.region = region;
  }

  getRegion() {
    return this.region;
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setUserLocale(userLocale) {
    // TODO(@antleblanc): Remove it on February 4th, 2021.
    const locale =
      userLocale === 'cs_CZ'
        ? userLocale
        : findAvailableLocale(userLocale, this.getRegion());
    saveUserLocale(locale);
    this.userLocale = locale;
  }

  getUserLocale() {
    return this.userLocale;
  }

  getUserLanguage() {
    return this.userLocale.split('_')[0];
  }

  setVersion(version) {
    this.version = version;
  }

  getVersion() {
    return this.version;
  }

  setApplicationURLs(applicationURLs) {
    this.applicationURLs = applicationURLs;
  }

  getApplicationURLs() {
    return this.applicationURLs;
  }

  getApplicationURL(id) {
    return this.applicationURLs[id];
  }
}
