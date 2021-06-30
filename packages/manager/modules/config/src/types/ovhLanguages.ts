export const enum Region {
  US = 'US',
  CA = 'CA',
  EU = 'EU',
}

export const enum CountryCode {
  US = 'US',
  CA = 'CA',
  EU = 'EU',
  FR = 'FR',
  GB = 'GB',
}
export type LangId = 'cs' | 'fi' | 'lt' | 'nl' | 'fr' | 'en';

export interface KeyPairName {
  name: string;
  key: string;
}

export type PreferredRegionByLang = {
  [langKey in LangId]?: { [regionKey in Region]?: CountryCode };
};

export interface OVHLanguages {
  available: Array<KeyPairName>;
  defaultLoc: string;
  fallback: string;
  preferred: PreferredRegionByLang;
}
