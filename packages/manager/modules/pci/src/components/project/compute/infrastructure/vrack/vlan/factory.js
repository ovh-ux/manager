export default /* @ngInject */ (
  $q,
  OvhApiCloudProject,
) => {
  const VlanFactory = (function vlanFactory() {
    return function CloudProjectComputeInfraVrackVlanFactory(options) {
      this.serviceName = options.serviceName || null;
    };
  }());

  // /////////////////////
  //      METHODS      //
  // /////////////////////

  VlanFactory.prototype.hasVrack = function hasVrack() {
    return OvhApiCloudProject.v6().vrack({ serviceName: this.serviceName }).$promise
      .then(() => true, (err) => {
        if (err && err.status === 404) {
          return false;
        }
        return $q.reject(err);
      });
  };

  return VlanFactory;
};
