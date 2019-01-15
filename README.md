# OVH Manager

# Introduction

This repository is a monorepo containing all the source code of our customer areas, as well as their components.

# Installation

Clone this repository and let's go at the root of the folder :)

```bash
cd manager
```

Install it by using yarn >= 1.7 (we are using workspace feature: <https://yarnpkg.com/lang/en/docs/cli/workspace/>)

```bash
yarn install
```

# Available modules

| App     | Version | Dependencies | Dev dependencies | Peer dependencies | Changelog |
| ------- | ------- | ------------ | ---------------- | ----------------- | :-------: |
| [@ovh-ux/manager-core](https://github.com/ovh-ux/manager/tree/master/packages/manager/modules/core) | [![npm version](https://badgen.net/npm/v/@ovh-ux/manager-core)](https://www.npmjs.com/package/@ovh-ux/manager-core) | [![Dependencies](https://badgen.net/david/dep/ovh-ux/manager/packages/manager/modules/core)](https://npmjs.com/package/@ovh-ux/manager-core?activeTab=dependencies) | [![Dev Dependencies](https://badgen.net/david/dev/ovh-ux/manager/packages/manager/modules/core)](https://npmjs.com/package/@ovh-ux/manager-core?activeTab=dependencies) | [![Peer Dependencies](https://badgen.net/david/peer/ovh-ux/manager/packages/manager/modules/core)](https://npmjs.com/package/@ovh-ux/manager-core?activeTab=dependencies) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/modules/core/CHANGELOG.md) |
| [@ovh-ux/manager-freefax](https://github.com/ovh-ux/manager/tree/master/packages/manager/modules/freefax) | [![npm version](https://badgen.net/npm/v/@ovh-ux/manager-freefax)](https://www.npmjs.com/package/@ovh-ux/manager-freefax) | [![Dependencies](https://badgen.net/david/dep/ovh-ux/manager/packages/manager/modules/freefax)](https://npmjs.com/package/@ovh-ux/manager-freefax?activeTab=dependencies) | [![Dev Dependencies](https://badgen.net/david/dev/ovh-ux/manager/packages/manager/modules/freefax)](https://npmjs.com/package/@ovh-ux/manager-freefax?activeTab=dependencies) |  [![Peer Dependencies](https://badgen.net/david/peer/ovh-ux/manager/packages/manager/modules/freefax)](https://npmjs.com/package/@ovh-ux/manager-freefax?activeTab=dependencies) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/modules/freefax/CHANGELOG.md) |
| [@ovh-ux/manager-overthebox](https://github.com/ovh-ux/manager/tree/master/packages/manager/modules/overthebox) | [![npm version](https://badgen.net/npm/v/@ovh-ux/manager-overthebox)](https://www.npmjs.com/package/@ovh-ux/manager-overthebox) | [![Dependencies](https://badgen.net/david/dep/ovh-ux/manager/packages/manager/modules/overthebox)](https://npmjs.com/package/@ovh-ux/manager-overthebox?activeTab=dependencies) | [![Dev Dependencies](https://badgen.net/david/dev/ovh-ux/manager/packages/manager/modules/overthebox)](https://npmjs.com/package/@ovh-ux/manager-overthebox?activeTab=dependencies) | [![Peer Dependencies](https://badgen.net/david/peer/ovh-ux/manager/packages/manager/modules/overthebox)](https://npmjs.com/package/@ovh-ux/manager-overthebox?activeTab=dependencies) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/modules/overthebox/CHANGELOG.md) |
| [@ovh-ux/manager-sms](https://github.com/ovh-ux/manager/tree/master/packages/manager/modules/sms) | [![npm version](https://badgen.net/npm/v/@ovh-ux/manager-sms)](https://www.npmjs.com/package/@ovh-ux/manager-sms) | [![Dependencies](https://badgen.net/david/dep/ovh-ux/manager/packages/manager/modules/sms)](https://npmjs.com/package/@ovh-ux/manager-sms?activeTab=dependencies) | [![Dev Dependencies](https://badgen.net/david/dev/ovh-ux/manager/packages/manager/modules/sms)](https://npmjs.com/package/@ovh-ux/manager-sms?activeTab=dependencies) | [![Peer Dependencies](https://badgen.net/david/peer/ovh-ux/manager/packages/manager/modules/sms)](https://npmjs.com/package/@ovh-ux/manager-sms?activeTab=dependencies) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/modules/sms/CHANGELOG.md) |
| [@ovh-ux/manager-telecom-styles](https://github.com/ovh-ux/manager/tree/master/packages/manager/modules/telecom-styles) | [![npm version](https://badgen.net/npm/v/@ovh-ux/manager-telecom-styles)](https://www.npmjs.com/package/@ovh-ux/manager-telecom-styles) | [![Dependencies](https://badgen.net/david/dep/ovh-ux/manager/packages/manager/modules/telecom-styles)](https://npmjs.com/package/@ovh-ux/manager-telecom-styles?activeTab=dependencies) | [![Dev Dependencies](https://badgen.net/david/dev/ovh-ux/manager/packages/manager/modules/telecom-styles)](https://npmjs.com/package/@ovh-ux/manager-telecom-styles?activeTab=dependencies) | [![Peer Dependencies](https://badgen.net/david/peer/ovh-ux/manager/packages/manager/modules/telecom-styles)](https://npmjs.com/package/@ovh-ux/manager-telecom-styles?activeTab=dependencies) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/modules/telecom-styles/CHANGELOG.md) |
| [@ovh-ux/manager-telecom-task](https://github.com/ovh-ux/manager/tree/master/packages/manager/modules/telecom-task) | [![npm version](https://badgen.net/npm/v/@ovh-ux/manager-telecom-task)](https://www.npmjs.com/package/@ovh-ux/manager-telecom-task) | [![Dependencies](https://badgen.net/david/dep/ovh-ux/manager/packages/manager/modules/telecom-task)](https://npmjs.com/package/@ovh-ux/manager-telecom-task?activeTab=dependencies) | [![Dev Dependencies](https://badgen.net/david/dev/ovh-ux/manager/packages/manager/modules/telecom-task)](https://npmjs.com/package/@ovh-ux/manager-telecom-task?activeTab=dependencies) | [![Peer Dependencies](https://badgen.net/david/peer/ovh-ux/manager/packages/manager/modules/telecom-task)](https://npmjs.com/package/@ovh-ux/manager-telecom-task?activeTab=dependencies) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/modules/telecom-task/CHANGELOG.md) |
| [@ovh-ux/manager-welcome](https://github.com/ovh-ux/manager/tree/develop/packages/manager/modules/welcome) | [![npm version](https://badgen.net/npm/v/@ovh-ux/manager-welcome)](https://www.npmjs.com/package/@ovh-ux/manager-welcome) | [![Dependencies](https://badgen.net/david/dep/ovh-ux/manager/packages/manager/modules/welcome)](https://npmjs.com/package/@ovh-ux/manager-welcome?activeTab=dependencies) | [![Dev Dependencies](https://badgen.net/david/dev/ovh-ux/manager/packages/manager/modules/welcome)](https://npmjs.com/package/@ovh-ux/manager-welcome?activeTab=dependencies) | [![Peer Dependencies](https://badgen.net/david/peer/ovh-ux/manager/packages/manager/modules/welcome)](https://npmjs.com/package/@ovh-ux/manager-welcome?activeTab=dependencies) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/modules/welcome/CHANGELOG.md) |

# Available apps

| App     | Changelog |
| ------- | :-------: |
| [@ovh-ux/manager-freefax-app](https://github.com/ovh-ux/manager/tree/master/packages/manager/apps/freefax) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/apps/freefax/CHANGELOG.md) |
| [@ovh-ux/manager-layout-ovh](https://github.com/ovh-ux/manager/tree/master/packages/manager/apps/layout-ovh) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/apps/layout-ovh/CHANGELOG.md) |
| [@ovh-ux/manager-overthebox-app](https://github.com/ovh-ux/manager/tree/master/packages/manager/apps/overthebox) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/apps/overthebox/CHANGELOG.md) |
| [@ovh-ux/manager-sms-app](https://github.com/ovh-ux/manager/tree/master/packages/manager/apps/sms) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/apps/sms/CHANGELOG.md) |
| [@ovh-ux/manager-telecom-task-app](https://github.com/ovh-ux/manager/tree/master/packages/manager/apps/telecom-task) | [:books:](https://github.com/ovh-ux/manager/blob/master/packages/manager/apps/telecom-task/CHANGELOG.md) |

## Contributing

Always feel free to help out! Whether it's [filing bugs and feature requests](https://github.com/ovh-ux/manager/issues/new) or working on some of the [open issues](https://github.com/ovh-ux/manager/issues), our [contributing guide](CONTRIBUTING.md) will help get you started.

## License

[BSD-3-Clause](LICENSE) © OVH SAS
