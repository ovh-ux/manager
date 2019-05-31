## [6.2.3](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@6.2.2...@ovh-ux/manager-layout-ovh@6.2.3) (2019-05-23)


### Bug Fixes

* **apps.layout-ovh:** upgrade manager-navbar to v0.4.2 ([#713](https://github.com/ovh-ux/manager/issues/713)) ([e6b62b9](https://github.com/ovh-ux/manager/commit/e6b62b9)), closes [#690](https://github.com/ovh-ux/manager/issues/690)



## [6.2.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@6.2.1...@ovh-ux/manager-layout-ovh@6.2.2) (2019-05-14)


### Bug Fixes

* **i18n:** add missing translations ([471503c](https://github.com/ovh-ux/manager/commit/471503c))



## [6.2.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@6.2.0...@ovh-ux/manager-layout-ovh@6.2.1) (2019-05-13)


### Bug Fixes

* **deps:** upgrade ng-ovh-telecom-universe-components to v3.0.3 ([574ff83](https://github.com/ovh-ux/manager/commit/574ff83))



# [6.2.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@6.1.0...@ovh-ux/manager-layout-ovh@6.2.0) (2019-05-07)


### Features

* **instances:** add instance dashboard ([26b25f7](https://github.com/ovh-ux/manager/commit/26b25f7))
* **navbar:** add managers navbar ([cb13bfb](https://github.com/ovh-ux/manager/commit/cb13bfb))
* **storages.volume-snapshots:** add volume-snapshots list ([#359](https://github.com/ovh-ux/manager/issues/359)) ([c8a63fd](https://github.com/ovh-ux/manager/commit/c8a63fd))



# [6.1.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@6.0.0...@ovh-ux/manager-layout-ovh@6.1.0) (2019-03-22)


### Features

* **pci:** add @ovh-ux/manager-pci package ([#230](https://github.com/ovh-ux/manager/issues/230)) ([9c36a75](https://github.com/ovh-ux/manager/commit/9c36a75))



# [6.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@5.0.0...@ovh-ux/manager-layout-ovh@6.0.0) (2019-03-19)


### Code Refactoring

* bump all packages to [@ovh-ux](https://github.com/ovh-ux)/manager-core@^5.0.0 ([7cbc70a](https://github.com/ovh-ux/manager/commit/7cbc70a))


### BREAKING CHANGES

* Until theses packages has a dependency to @ovh-ux/manager-core@^5.0.0, the host project needs to import @ovh-ux/manager-config

Before:

yarn add @ovh-ux/manager-core

Now:

yarn add @ovh-ux/manager-config
yarn add @ovh-ux/manager-core



# [5.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@4.0.0...@ovh-ux/manager-layout-ovh@5.0.0) (2019-03-14)


### Build System

* **deps:** upgrade ng-at-internet to v4.0.0 ([#265](https://github.com/ovh-ux/manager/issues/265)) ([e89e179](https://github.com/ovh-ux/manager/commit/e89e179))


### BREAKING CHANGES

* **deps:** replace `ng-at-internet` by `@ovh-ux/ng-at-internet`



# [4.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@3.0.3...@ovh-ux/manager-layout-ovh@4.0.0) (2019-03-13)


### Build System

* **deps:** upgrade dependencies ([#252](https://github.com/ovh-ux/manager/issues/252)) ([f87f7b7](https://github.com/ovh-ux/manager/commit/f87f7b7))


### BREAKING CHANGES

* **deps:** replace both `@ovh-ux/ng-ovh-apiv7` and `ovh-angular-swimming-poll` by `@ovh-ux/ng-ovh-api-wrappers` and `@ovh-ux/ng-ovh-swimming-poll`



## [3.0.3](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@3.0.2...@ovh-ux/manager-layout-ovh@3.0.3) (2019-03-08)


### Bug Fixes

* **i18n:** add missing translations ([6b55189](https://github.com/ovh-ux/manager/commit/6b55189))
* **i18n:** add missing translations ([168d510](https://github.com/ovh-ux/manager/commit/168d510))



## [3.0.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@3.0.1...@ovh-ux/manager-layout-ovh@3.0.2) (2019-03-01)


### Bug Fixes

* **i18n:** add missing translations ([aab7768](https://github.com/ovh-ux/manager/commit/aab7768))



## [3.0.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@3.0.0...@ovh-ux/manager-layout-ovh@3.0.1) (2019-02-28)


### Bug Fixes

* **i18n:** add missing translations ([1c99f17](https://github.com/ovh-ux/manager/commit/1c99f17))
* **i18n:** add missing translations ([83fc2ad](https://github.com/ovh-ux/manager/commit/83fc2ad))
* **i18n:** add missing translations ([701d753](https://github.com/ovh-ux/manager/commit/701d753))



# [3.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@2.0.0...@ovh-ux/manager-layout-ovh@3.0.0) (2019-02-26)


### Build System

* **deps:** upgrade ng-ovh-apiv7 to v2.0.0 ([ac6ac62](https://github.com/ovh-ux/manager/commit/ac6ac62))
* **deps:** upgrade ng-pagination-front to v8.0.0-alpha.0 ([f820440](https://github.com/ovh-ux/manager/commit/f820440))


### BREAKING CHANGES

* **deps:** replace `ovh-angular-apiv7` by `@ovh-ux/ng-ovh-apiv7`
* **deps:** replace `ovh-angular-pagination-front` by `@ovh-ux/ng-pagination-front`



# [2.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.2.5...@ovh-ux/manager-layout-ovh@2.0.0) (2019-01-29)


### Build System

* **deps:** upgrade ng-ovh-http to v4.0.1-beta.0 ([b2e4388](https://github.com/ovh-ux/manager/commit/b2e4388))
* **deps:** upgrade ng-ovh-otrs to v7.0.0-beta.1 ([9c8da48](https://github.com/ovh-ux/manager/commit/9c8da48))
* **deps:** upgrade ng-ovh-sidebar-menu to v8.0.0-beta.0 ([460588c](https://github.com/ovh-ux/manager/commit/460588c))
* **deps:** upgrade ng-ovh-sso-auth to v4.0.0-beta.0 ([8acac96](https://github.com/ovh-ux/manager/commit/8acac96))
* **deps:** upgrade ng-ovh-telecom-universe-components to v2.0.1 ([3ffc516](https://github.com/ovh-ux/manager/commit/3ffc516))
* **deps:** upgrade ng-translate-async-loader to v2.0.0 ([40e8ea7](https://github.com/ovh-ux/manager/commit/40e8ea7))


### BREAKING CHANGES

* **deps:** replace `ovh-angular-sidebar-menu` by `@ovh-ux/ng-ovh-sidebar-menu`
* **deps:** replace `ovh-angular-otrs` by `@ovh-ux/ng-ovh-otrs`
* **deps:** replace `@ovh-ux/translate-async-loader` by `@ovh-ux/ng-translate-async-loader`
* **deps:** replace `@ovh-ux/telecom-universe-components` by `@ovh-ux/ng-ovh-telecom-universe-components`
* **deps:** replace `ovh-angular-sso-auth` by `@ovh-ux/ng-ovh-sso-auth`
* **deps:** replace `ovh-angular-http` by `@ovh-ux/ng-ovh-http`



## [1.2.5](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.2.4...@ovh-ux/manager-layout-ovh@1.2.5) (2019-01-23)


### Bug Fixes

* **layout-ovh:** update sms.dashboard state to sms.service.dashboard ([2c526e4](https://github.com/ovh-ux/manager/commit/2c526e4))



## [1.2.4](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.2.3...@ovh-ux/manager-layout-ovh@1.2.4) (2019-01-21)


### Bug Fixes

* **telecom-styles:** fix elements using rem ([00c5425](https://github.com/ovh-ux/manager/commit/00c5425))



## [1.2.3](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.2.2...@ovh-ux/manager-layout-ovh@1.2.3) (2019-01-17)


### Bug Fixes

* use new component to display contracts ([f0e0a1b](https://github.com/ovh-ux/manager/commit/f0e0a1b))



## [1.2.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.2.1...@ovh-ux/manager-layout-ovh@1.2.2) (2019-01-15)


### Bug Fixes

* **layout-ovh:** remove location hashPrefix ([be584a9](https://github.com/ovh-ux/manager/commit/be584a9))



## [1.2.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.2.0...@ovh-ux/manager-layout-ovh@1.2.1) (2019-01-10)



# [1.2.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.1.0...@ovh-ux/manager-layout-ovh@1.2.0) (2019-01-03)


### Bug Fixes

* **manager-layout-ovh:** remove default  prefix ([dc5a9fe](https://github.com/ovh-ux/manager/commit/dc5a9fe))
* rework imports to improve standalone modules ([9cdabab](https://github.com/ovh-ux/manager/commit/9cdabab))
* use [@ovh-ux](https://github.com/ovh-ux)/manager-telecom-styles ([d9d6f3f](https://github.com/ovh-ux/manager/commit/d9d6f3f))


### Features

* **manager-sms:** initial module import ([9aac091](https://github.com/ovh-ux/manager/commit/9aac091))



# [1.1.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.1.0-alpha.0...@ovh-ux/manager-layout-ovh@1.1.0) (2018-12-12)


### Bug Fixes

* **deps:** bump ovh-angular-contracts ([008f084](https://github.com/ovh-ux/manager/commit/008f084))
* **i18n:** load translations with annotations instead of import ([a26b7bc](https://github.com/ovh-ux/manager/commit/a26b7bc))
* **layout-ovh:** move navbar.constants ([8c52f69](https://github.com/ovh-ux/manager/commit/8c52f69))
* **layout-ovh:** update ngInject annotations ([4ed33c0](https://github.com/ovh-ux/manager/commit/4ed33c0))
* update ng-uirouter-title usage ([440fbc5](https://github.com/ovh-ux/manager/commit/440fbc5))


### Features

* **core:** add translation configuration ([d71117f](https://github.com/ovh-ux/manager/commit/d71117f))
* add lazyload on multiple components and styles ([abb6047](https://github.com/ovh-ux/manager/commit/abb6047))



# [1.1.0-alpha.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.0.0-alpha.2...@ovh-ux/manager-layout-ovh@1.1.0-alpha.0) (2018-12-05)


### Bug Fixes

* **layout-ovh:** move navbar.constants ([caf4e99](https://github.com/ovh-ux/manager/commit/caf4e99))
* **layout-ovh:** update ngInject annotations ([6c7485b](https://github.com/ovh-ux/manager/commit/6c7485b))


### Features

* **core:** add translation configuration ([f8c03cd](https://github.com/ovh-ux/manager/commit/f8c03cd))



# [1.0.0-alpha.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.0.0-alpha.1...@ovh-ux/manager-layout-ovh@1.0.0-alpha.2) (2018-11-28)


### Bug Fixes

* **layout-ovh:** change otb loadOnState to overthebox state ([34b9ae8](https://github.com/ovh-ux/manager/commit/34b9ae8))



# [1.0.0-alpha.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@1.0.0-alpha.0...@ovh-ux/manager-layout-ovh@1.0.0-alpha.1) (2018-11-28)


### Bug Fixes

* **deps:** update ovh-angular-contracts ([5a0a58c](https://github.com/ovh-ux/manager/commit/5a0a58c))



# [1.0.0-alpha.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-layout-ovh@0.0.0...@ovh-ux/manager-layout-ovh@1.0.0-alpha.0) (2018-11-26)



