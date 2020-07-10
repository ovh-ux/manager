# Manager Registry

> Registry for OVHcloud Manager.

[![Downloads](https://badgen.net/npm/dt/@ovh-ux/manager-registry)](https://npmjs.com/package/@ovh-ux/manager-registry) [![Dependencies](https://badgen.net/david/dep/ovh-ux/manager/packages/manager/tools/registry)](https://npmjs.com/package/@ovh-ux/manager-registry?activeTab=dependencies) [![Dev Dependencies](https://badgen.net/david/dev/ovh-ux/manager/packages/manager/tools/registry)](https://npmjs.com/package/@ovh-ux/manager-registry?activeTab=dependencies) [![Gitter](https://badgen.net/badge/gitter/ovh-ux/blue?icon=gitter)](https://gitter.im/ovh/ux)

## Installation

```sh
yarn global add @ovh-ux/manager-registry
```

or

```sh
yarn add @ovh-ux/manager-registry
```

## Usage

### CLI

#### Help

```sh
manager-registry --help
Usage: manager-registry [options] [command]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  dev <path>     Dev server for local fragments
  help [cmd]     display help for [cmd]

```

##### Common Options

* `-V, --version` : Display version number
* `-h, --help`: Display help

#### Dev

```sh
manager-registry dev --help
Usage: manager-registry-dev [options] <fragmentsPath>

Options:
  -V, --version      output the version number
  -p, --port <port>  server port (default: 8888)
  -h, --help         output usage information

```

##### Options

* `-p, --port <port>` : Server port (default: 8888)

```sh
$ manager-registry dev ./packages/manager/fragments
Serve: ./packages/manager/fragments - localhost:8888

$ manager-registry dev ./packages/manager/fragments -p 1234
Serve: ./packages/manager/fragments - localhost:1234
```

## Related

* [manager-registry](https://github.com/ovh-ux/manager/tree/master/packages/manager/tools/registry) - OVHcloud manager shared dev server configuration

## Contributing

Always feel free to help out! Whether it's [filing bugs and feature requests](https://github.com/ovh/manager/issues/new) or working on some of the [open issues](https://github.com/ovh/manager/issues), our [contributing guide](https://github.com/ovh/manager/blob/master/CONTRIBUTING.md) will help get you started.

## License

[BSD-3-Clause](LICENSE) © OVH SAS
