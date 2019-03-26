# [4.1.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-telecom-dashboard-app@4.0.0...@ovh-ux/manager-telecom-dashboard-app@4.1.0) (2019-03-22)


### Features

* **pci:** add @ovh-ux/manager-pci package ([#230](https://github.com/ovh-ux/manager/issues/230)) ([9c36a75](https://github.com/ovh-ux/manager/commit/9c36a75))



# [4.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-telecom-dashboard-app@3.0.0...@ovh-ux/manager-telecom-dashboard-app@4.0.0) (2019-03-19)


### Code Refactoring

* bump all packages to [@ovh-ux](https://github.com/ovh-ux)/manager-core@^5.0.0 ([7cbc70a](https://github.com/ovh-ux/manager/commit/7cbc70a))


### BREAKING CHANGES

* Until theses packages has a dependency to @ovh-ux/manager-core@^5.0.0, the host project needs to import @ovh-ux/manager-config

Before:

yarn add @ovh-ux/manager-core

Now:

yarn add @ovh-ux/manager-config
yarn add @ovh-ux/manager-core



# [3.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-telecom-dashboard-app@2.0.0...@ovh-ux/manager-telecom-dashboard-app@3.0.0) (2019-03-14)


### Build System

* **deps:** upgrade ng-at-internet to v4.0.0 ([#265](https://github.com/ovh-ux/manager/issues/265)) ([e89e179](https://github.com/ovh-ux/manager/commit/e89e179))


### BREAKING CHANGES

* **deps:** replace `ng-at-internet` by `@ovh-ux/ng-at-internet`



# [2.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-telecom-dashboard-app@1.0.0...@ovh-ux/manager-telecom-dashboard-app@2.0.0) (2019-03-13)


### Build System

* **deps:** upgrade dependencies ([#252](https://github.com/ovh-ux/manager/issues/252)) ([f87f7b7](https://github.com/ovh-ux/manager/commit/f87f7b7))


### BREAKING CHANGES

* **deps:** replace both `@ovh-ux/ng-ovh-apiv7` and `ovh-angular-swimming-poll` by `@ovh-ux/ng-ovh-api-wrappers` and `@ovh-ux/ng-ovh-swimming-poll`



# [1.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-telecom-dashboard-app@0.1.0...@ovh-ux/manager-telecom-dashboard-app@1.0.0) (2019-01-29)


### Build System

* **deps:** upgrade ng-ovh-telecom-universe-components to v2.0.1 ([3ffc516](https://github.com/ovh-ux/manager/commit/3ffc516))


### BREAKING CHANGES

* **deps:** replace `@ovh-ux/telecom-universe-components` by `@ovh-ux/ng-ovh-telecom-universe-components`



# [0.1.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-telecom-dashboard-app@0.0.0...@ovh-ux/manager-telecom-dashboard-app@0.1.0) (2019-01-21)


### Bug Fixes

* **telecom-dashboard:** imports ([a6ae3c7](https://github.com/ovh-ux/manager/commit/a6ae3c7))
* **telecom-styles:** fix elements using rem ([00c5425](https://github.com/ovh-ux/manager/commit/00c5425))


### Features

* telecom dashboard wip ([61bd4f3](https://github.com/ovh-ux/manager/commit/61bd4f3))



