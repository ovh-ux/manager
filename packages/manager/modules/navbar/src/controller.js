import get from 'lodash/get';
import has from 'lodash/has';
import omit from 'lodash/omit';

import { BRAND, NON_PRIMARY_ITEMS } from './constants';

export default class {
  /* @ngInject */
  constructor(
    $scope,
    $translate,
    $window,
    Navbar,
  ) {
    this.$scope = $scope;
    this.$translate = $translate;
    this.$window = $window;
    this.Navbar = Navbar;
  }

  $onInit() {
    this.isLoading = true;
    this.brand = this.buildBrand();

    if (has(this.navbarOptions, 'toggle')) {
      this.togglerisLoading = true;

      this.$scope.$on(get(this.navbarOptions, 'toggle.event'), () => {
        this.togglerisLoading = false;

        if (this.mainLinks) {
          this.buildResponsiveLinks();
        }
      });
    }

    this.fixed = get(this.navbarOptions, 'fixed', false);

    return this.getUser()
      .then(() => this.$translate.refresh())
      .then(() => this.buildMainLinks())
      .then(() => this.buildResponsiveLinks())
      .finally(() => {
        this.$scope.$emit('navbar.loaded');
        this.isLoading = false;
      });
  }

  getUser() {
    return this.Navbar.getUser()
      .then((user) => {
        this.user = user;
      });
  }

  buildBrand() {
    return ({
      label: this.brandLabel,
      url: `${this.$window.location.origin}${this.$window.location.pathname}`,
      ...BRAND,
    });
  }

  buildMainLinks() {
    return this.Navbar.getUniverses(get(this.navbarOptions, 'version'))
      .then((universes) => {
        this.mainLinks = universes.map(({ universe: name, url }) => ({
          name,
          title: this.$translate.instant(`navbar_universe_${name}`),
          url: url || '#',
          isPrimary: !NON_PRIMARY_ITEMS.includes(name),
        }));
      });
  }

  buildResponsiveLinks() {
    if (this.sidebarLinks && !this.responsiveLinks) {
      this.responsiveLinks = this.mainLinks.map((link) => {
        if (link.name === get(this.navbarOptions, 'universe')) {
          return ({
            ...omit(link, 'url'),
            subLinks: this.sidebarLinks,
          });
        }

        return link;
      });
    }
  }
}
