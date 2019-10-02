import first from 'lodash/first';
import Stream from './stream.class';

export default class PciProjectStreamService {
  /* @ngInject */
  constructor($q, OvhApiCloudProjectIo) {
    this.$q = $q;
    this.OvhApiCloudProjectIo = OvhApiCloudProjectIo;
  }

  getAll(projectId) {
    return this.OvhApiCloudProjectIo
      .Stream()
      .v6()
      .query({
        serviceName: projectId,
      })
      .$promise
      .then(streams => this.$q.all(
        streams.map(streamId => this.get(projectId, streamId)),
      ));
  }

  get(projectId, streamId) {
    return this.OvhApiCloudProjectIo
      .Stream()
      .v6()
      .get({
        serviceName: projectId,
        streamId,
      })
      .$promise
      .then(stream => new Stream({
        ...stream,
      }));
  }

  getStats(projectId, stream) {
    return this.OvhApiCloudProjectIo
      .Stream()
      .v6()
      .getStats({
        serviceName: projectId,
        streamId: stream.id,
      })
      .$promise
      .then(stats => new Stream({
        ...stream,
        stats,
      }));
  }

  getRegion(projectId, stream) {
    return this.OvhApiCloudProjectIo
      .Capabilities()
      .Stream()
      .Region()
      .v6()
      .get({
        serviceName: projectId,
        regionName: first(stream.regions),
      })
      .$promise
      .then(region => new Stream({
        ...stream,
        region,
      }));
  }

  delete(projectId, { id: streamId }) {
    return this.OvhApiCloudProjectIo
      .Stream()
      .v6()
      .delete({
        serviceName: projectId,
        streamId,
      })
      .$promise;
  }
}
