#!/usr/bin/env node

const fs = require('fs');
const getMonorepoPackages = require('get-monorepo-packages');
const path = require('path');
const pick = require('lodash/pick');

// Get all workspaces defined in the `package.json` file.
const { workspaces } = require('../package.json');

// Keep the bare minimum entries from all package.json files.
const entries = ['name', 'version', 'description', 'repository'];

// Get all packages contained inside the monorepo.
const directoryPath = path.resolve();
const packages = getMonorepoPackages(directoryPath).map(
  ({ location, package: pkg }) => ({
    location,
    package: pick(pkg, entries),
  }),
);

// Group packages by their corresponding workspaces.
const groupedWorkspaces = workspaces.map((workspace) => {
  const packagesList = packages.filter((pkg) => {
    // Remove the pattern `/*` from the workspace name.
    if (pkg.location.includes(workspace.slice(0, -2))) {
      return Object.assign(pkg, {
        location: pkg.location.replace(directoryPath, ''),
      });
    }
    return null;
  });

  return {
    workspace,
    packagesList,
  };
});

// Retrieve parameter.
const [, , param] = process.argv;

// Output to a static file.
fs.writeFileSync(
  param || 'docs/.vuepress/public/assets/json/packages.json',
  JSON.stringify(groupedWorkspaces),
);
