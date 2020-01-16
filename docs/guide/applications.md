# Applications

All applications are located in the `packages/manager/apps/*` workspace.

It houses:

- Four large AngularJS monolithic applications (listed below).
- A Sign-up form.
- Several standalone applications.

The monolithic applications can be started for a specific region

| Application                   | Region       |
| ----------------------------- | ------------ |
| [Web](#web)                   | EU           |
| [Server](#server)             | EU / CA / US |
| [Public Cloud](#public-cloud) | EU / CA / US |
| [Telecom](#telecom)           | EU           |

:::tip Information
Depending on the requested region, the URL to access the API will be different
- <https://api.ovh.com/console/>
- <https://ca.api.ovh.com/console/>
- <https://api.us.ovhcloud.com/console/>
:::

## Web

![](/manager/assets/img/control-panel-web.jpg)

### How to start the application?

#### Using `yarn workspace` <Badge text="recommended"/>

```sh
$ yarn workspace @ovh-ux/manager-web run start:dev
```

#### Using alternative

```sh
$ cd packages/manager/apps/web
$ yarn run start:dev
```

### How to build the application?

```sh
$ yarn run build -p @ovh-ux/manager-web
```

## Server

![](/manager/assets/img/control-panel-server.jpg)

::: tip Information
Both applications **Dedicated** and **Cloud** are grouped under the **Server**
tab.

They can be started in different region with a given environment variable.
:::

### How to start the application?

```sh
$ export REGION=EU && yarn workspace @ovh-ux/manager-dedicated run start:dev
```

or:

```sh
$ cd packages/manager/apps/dedicated # or cloud
$ export REGION=EU && yarn run start:dev
```

### How to build the application?

```sh
$ yarn run build -p @ovh-ux/manager-dedicated # or @ovh-ux/manager-cloud
```

## Public Cloud

![](/manager/assets/img/control-panel-public-cloud.jpg)

::: tip Information
Application can be started in different region with a given environment variable.
:::

### How to start the application?

```sh
$ export REGION=EU && yarn workspace @ovh-ux/manager-public-cloud run start:dev
```

or:

```sh
$ cd packages/manager/apps/public-cloud
$ export REGION=EU && yarn run start:dev
```

### How to build the application?

```sh
$ yarn run build -p @ovh-ux/manager-public-cloud
```

## Telecom

![](/manager/assets/img/control-panel-telecom.jpg)

### How to start the application?

```sh
$ yarn workspace @ovh-ux/manager-telecom run start:dev
```

or:

```sh
$ cd packages/manager/apps/telecom
$ yarn run start:dev
```

### How to build the application?

```sh
$ yarn run build -p @ovh-ux/manager-telecom
```

## Related

- [@ovh-ux/sao-ovh-manager-app](https://github.com/ovh/manager/blob/develop/packages/manager/tools/sao-ovh-manager-app/README.md) - Scaffolding tool for standalone applications.

## All applications

<ListPackages type="apps"/>
