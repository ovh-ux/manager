export default class OvhManagerPciServingNamespaceModelsAddServiceCapabilities {
  /* @ngInject */
  constructor(OvhApiCloudProjectAi) {
    this.OvhApiCloudProjectAi = OvhApiCloudProjectAi;
  }

  getFlavors(serviceName) {
    return this.OvhApiCloudProjectAi.Capabilities()
      .Serving()
      .Flavor()
      .v6()
      .query({
        serviceName,
      }).$promise;
  }

  getPresetImages(serviceName) {
    return this.OvhApiCloudProjectAi.Capabilities()
      .Serving()
      .PresetImage()
      .v6()
      .query({
        serviceName,
      }).$promise;
  }
}
