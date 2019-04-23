# [6.1.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@6.0.0...@ovh-ux/manager-sms-app@6.1.0) (2019-03-22)


### Features

* **pci:** add @ovh-ux/manager-pci package ([#230](https://github.com/ovh-ux/manager/issues/230)) ([9c36a75](https://github.com/ovh-ux/manager/commit/9c36a75))



# [6.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@5.0.0...@ovh-ux/manager-sms-app@6.0.0) (2019-03-19)


### Code Refactoring

* bump all packages to [@ovh-ux](https://github.com/ovh-ux)/manager-core@^5.0.0 ([7cbc70a](https://github.com/ovh-ux/manager/commit/7cbc70a))


### BREAKING CHANGES

* Until theses packages has a dependency to @ovh-ux/manager-core@^5.0.0, the host project needs to import @ovh-ux/manager-config

Before:

yarn add @ovh-ux/manager-core

Now:

yarn add @ovh-ux/manager-config
yarn add @ovh-ux/manager-core



# [5.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@4.0.0...@ovh-ux/manager-sms-app@5.0.0) (2019-03-14)


### Build System

* **deps:** upgrade ng-at-internet to v4.0.0 ([#265](https://github.com/ovh-ux/manager/issues/265)) ([e89e179](https://github.com/ovh-ux/manager/commit/e89e179))


### BREAKING CHANGES

* **deps:** replace `ng-at-internet` by `@ovh-ux/ng-at-internet`



# [4.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@3.0.0...@ovh-ux/manager-sms-app@4.0.0) (2019-03-13)


### Build System

* **deps:** upgrade dependencies ([#252](https://github.com/ovh-ux/manager/issues/252)) ([f87f7b7](https://github.com/ovh-ux/manager/commit/f87f7b7))


### BREAKING CHANGES

* **deps:** replace both `@ovh-ux/ng-ovh-apiv7` and `ovh-angular-swimming-poll` by `@ovh-ux/ng-ovh-api-wrappers` and `@ovh-ux/ng-ovh-swimming-poll`



# [3.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@2.0.0...@ovh-ux/manager-sms-app@3.0.0) (2019-02-26)


### Build System

* **deps:** upgrade ng-ovh-apiv7 to v2.0.0 ([ac6ac62](https://github.com/ovh-ux/manager/commit/ac6ac62))
* **deps:** upgrade ng-pagination-front to v8.0.0-alpha.0 ([f820440](https://github.com/ovh-ux/manager/commit/f820440))


### Features

* **sms:** replace responsive-tabs by header-tabs component ([#203](https://github.com/ovh-ux/manager/issues/203)) ([f5cb0eb](https://github.com/ovh-ux/manager/commit/f5cb0eb))


### BREAKING CHANGES

* **deps:** replace `ovh-angular-apiv7` by `@ovh-ux/ng-ovh-apiv7`
* **deps:** replace `ovh-angular-pagination-front` by `@ovh-ux/ng-pagination-front`



# [2.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@1.0.1...@ovh-ux/manager-sms-app@2.0.0) (2019-01-29)


### Build System

* **deps:** upgrade ng-ovh-telecom-universe-components to v2.0.1 ([3ffc516](https://github.com/ovh-ux/manager/commit/3ffc516))


### BREAKING CHANGES

* **deps:** replace `@ovh-ux/telecom-universe-components` by `@ovh-ux/ng-ovh-telecom-universe-components`



## [1.0.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@1.0.0...@ovh-ux/manager-sms-app@1.0.1) (2019-01-25)


### Bug Fixes

* **sms:** add error missing dependencies ([#144](https://github.com/ovh-ux/manager/issues/144)) ([b96ff13](https://github.com/ovh-ux/manager/commit/b96ff13))



# [1.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@0.1.3...@ovh-ux/manager-sms-app@1.0.0) (2019-01-23)


### Features

* **sms:** add global sms order ([e723a8b](https://github.com/ovh-ux/manager/commit/e723a8b))


### BREAKING CHANGES

* **sms:** rename sms.* states to sms.service.*



## [0.1.3](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@0.1.2...@ovh-ux/manager-sms-app@0.1.3) (2019-01-17)


### Bug Fixes

* use new component to display contracts ([f0e0a1b](https://github.com/ovh-ux/manager/commit/f0e0a1b))



## [0.1.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@0.1.1...@ovh-ux/manager-sms-app@0.1.2) (2019-01-15)


### Bug Fixes

* sort import to fix undefined lodash ([3bd12fc](https://github.com/ovh-ux/manager/commit/3bd12fc))



## [0.1.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@0.1.0...@ovh-ux/manager-sms-app@0.1.1) (2019-01-10)


### Bug Fixes

* sort import to fix undefined lodash ([ec5ae22](https://github.com/ovh-ux/manager/commit/ec5ae22))



# [0.1.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-sms-app@0.0.0...@ovh-ux/manager-sms-app@0.1.0) (2019-01-03)


### Features

* **app:** add standalone app for SMS ([157a745](https://github.com/ovh-ux/manager/commit/157a745))
