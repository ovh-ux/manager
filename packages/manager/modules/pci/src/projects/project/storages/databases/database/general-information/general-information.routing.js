import find from 'lodash/find';

export default /* @ngInject */ ($stateProvider) => {
  const stateName =
    'pci.projects.project.storages.databases.dashboard.general-information';
  $stateProvider.state(stateName, {
    url: '/general-information',
    views: {
      databaseView: 'ovhManagerPciProjectDatabaseGeneralInformation',
    },
    resolve: {
      billingLink: /* @ngInject */ ($state, projectId) =>
        $state.href('pci.projects.project.billing', {
          projectId,
        }),
      breadcrumb: () => false,
      goToAddNode: /* @ngInject */ ($state, databaseId, projectId) => () =>
        $state.go(
          'pci.projects.project.storages.databases.dashboard.general-information.add-node',
          {
            projectId,
            databaseId,
          },
        ),
      goToAllowedIPs: /* @ngInject */ ($state, databaseId, projectId) => () =>
        $state.go(
          'pci.projects.project.storages.databases.dashboard.allowed-ips',
          {
            projectId,
            databaseId,
          },
        ),
      goToDeleteDatabase: /* @ngInject */ ($state, database, projectId) => () =>
        $state.go(
          'pci.projects.project.storages.databases.dashboard.general-information.delete',
          {
            projectId,
            database,
          },
        ),
      goToEditName: /* @ngInject */ ($state, databaseId, projectId) => () =>
        $state.go(
          'pci.projects.project.storages.databases.dashboard.general-information.name',
          {
            projectId,
            databaseId,
          },
        ),
      goToUpgradePlan: /* @ngInject */ ($state, databaseId, projectId) => () =>
        $state.go(
          'pci.projects.project.storages.databases.dashboard.general-information.upgrade-plan',
          {
            projectId,
            databaseId,
          },
        ),
      goToUpgradeVersion: /* @ngInject */ (
        $state,
        databaseId,
        projectId,
      ) => () =>
        $state.go(
          'pci.projects.project.storages.databases.dashboard.general-information.upgrade-version',
          {
            projectId,
            databaseId,
          },
        ),
      goBack: /* @ngInject */ (database, goToDatabase) => (message, type) =>
        goToDatabase(database, message, type),
      goBackAndPoll: /* @ngInject */ (goBack, pollDatabaseStatus) => (
        message,
        type,
      ) => {
        pollDatabaseStatus();
        return goBack(message, type);
      },
      getCurrentFlavor: /* @ngInject */ (database, engine) => () =>
        engine.getFlavor(
          database.version,
          database.plan,
          database.region,
          database.flavor,
        ),
      getCurrentPlan: /* @ngInject */ (database, engine) => () =>
        engine.getPlan(database.version, database.plan),
      latestPlan: /* @ngInject */ (database, engine) =>
        engine.getLatestPlan(database.version, database.region).name,
      latestVersion: /* @ngInject */ (engine) =>
        engine.getLatestVersion().version,
      privateNetwork: /* @ngInject */ (database, privateNetworks) =>
        find(privateNetworks, (privateNetwork) =>
          find(privateNetwork.regions, { openstackId: database.networkId }),
        ),
      subnet: /* @ngInject */ (
        DatabaseService,
        database,
        projectId,
        privateNetwork,
      ) =>
        privateNetwork
          ? DatabaseService.getSubnets(projectId, privateNetwork.id)
              .then((subnets) => find(subnets, { id: database.subnetId }))
              .then((subnet) => ({
                ...subnet,
                name: `${subnet.ipPools[0].network} - ${subnet.ipPools[0].region}`,
              }))
          : undefined,
      pollDatabaseStatus: /* @ngInject */ (
        $translate,
        CucCloudMessage,
        DatabaseService,
        database,
        getNodes,
        pollNodesStatus,
        projectId,
      ) => () => {
        if (database.isProcessing()) {
          DatabaseService.pollDatabaseStatus(
            projectId,
            database.engine,
            database.id,
          )
            .then((databaseInfo) => {
              CucCloudMessage.flushMessages(stateName);
              CucCloudMessage.success(
                $translate.instant(
                  'pci_databases_general_information_database_ready',
                ),
                stateName,
              );
              database.updateData(databaseInfo);
              return getNodes(database).then((nodes) =>
                database.setNodes(nodes),
              );
            })
            .finally(() => {
              return pollNodesStatus();
            });
        }
      },
      pollNodesStatus: /* @ngInject */ (
        $translate,
        CucCloudMessage,
        DatabaseService,
        database,
        projectId,
      ) => () => {
        database.nodes.forEach((node) => {
          if (node.isProcessing()) {
            DatabaseService.pollNodeStatus(
              projectId,
              database.engine,
              database.id,
              node.id,
            ).then((nodeInfo) => {
              CucCloudMessage.success(
                $translate.instant(
                  'pci_databases_general_information_node_ready',
                  { nodeName: node.name },
                ),
                stateName,
              );
              node.updateData(nodeInfo);
            });
          }
        });
      },
      stopPollingDatabaseStatus: /* @ngInject */ (
        DatabaseService,
        databaseId,
      ) => () => DatabaseService.stopPollingDatabaseStatus(databaseId),
      stopPollingNodesStatus: /* @ngInject */ (
        DatabaseService,
        database,
      ) => () =>
        database.nodes.forEach((node) =>
          DatabaseService.stopPollingNodeStatus(node.id),
        ),
    },
  });
};
