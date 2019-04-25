import get from 'lodash/get';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import find from 'lodash/find';
import first from 'lodash/first';
import map from 'lodash/map';
import round from 'lodash/round';
import moment from 'moment';

import Instance from './instance.class';
import InstanceQuota from '../../../components/project/instance/quota/quota.class';
import BlockStorage from '../storages/blocks/block.class';
import Region from '../storages/blocks/region.class';

import {
  INSTANCE_BACKUP_CONSUMPTION,
} from './instances.constants';

export default class PciProjectInstanceService {
  /* @ngInject */
  constructor(
    $q,
    CucPriceHelper,
    OvhApiCloudProject,
    OvhApiCloudProjectFlavor,
    OvhApiCloudProjectImage,
    OvhApiCloudProjectInstance,
    OvhApiCloudProjectNetwork,
    OvhApiCloudProjectQuota,
    OvhApiCloudProjectVolume,
  ) {
    this.$q = $q;
    this.CucPriceHelper = CucPriceHelper;
    this.OvhApiCloudProject = OvhApiCloudProject;
    this.OvhApiCloudProjectFlavor = OvhApiCloudProjectFlavor;
    this.OvhApiCloudProjectImage = OvhApiCloudProjectImage;
    this.OvhApiCloudProjectInstance = OvhApiCloudProjectInstance;
    this.OvhApiCloudProjectNetwork = OvhApiCloudProjectNetwork;
    this.OvhApiCloudProjectQuota = OvhApiCloudProjectQuota;
    this.OvhApiCloudProjectVolume = OvhApiCloudProjectVolume;
  }

  getAll(projectId) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .query({
        serviceName: projectId,
      })
      .$promise
      .then(instances => map(instances, instance => new Instance(instance)));
  }

  getInstanceDetails(projectId, instance) {
    return this.$q
      .all({
        image: this.OvhApiCloudProjectImage
          .v6()
          .get({
            serviceName: projectId,
            imageId: instance.imageId,
          })
          .$promise
          .catch(() => null),
        flavor: this.OvhApiCloudProjectFlavor
          .v6()
          .get({
            serviceName: projectId,
            flavorId: instance.flavorId,
          })
          .$promise
          .catch(() => null),
        volumes: this.OvhApiCloudProjectVolume
          .v6()
          .query({
            serviceName: projectId,
          })
          .$promise
          .catch(() => []),
      })
      .then(({ image, flavor, volumes }) => new Instance({
        ...instance,
        image,
        flavor,
        volumes: filter(volumes, volume => includes(volume.attachedTo, instance.id)),
      }));
  }

  get(projectId, instanceId) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .get({
        serviceName: projectId,
        instanceId,
      })
      .$promise
      .then(instance => this.$q.all({
        instance,
        volumes: this.OvhApiCloudProjectVolume
          .v6()
          .query({
            serviceName: projectId,
          })
          .$promise
          .catch(() => []),
      }))
      .then(({ instance, volumes }) => new Instance({
        ...instance,
        volumes: filter(volumes, volume => includes(volume.attachedTo, instance.id)),
      }));
  }

  delete(projectId, { id: instanceId }) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .delete({
        serviceName: projectId,
        instanceId,
      })
      .$promise;
  }

  reinstall(projectId, { id: instanceId, image }) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .reinstall({
        serviceName: projectId,
        instanceId,
      }, {
        imageId: image.id,
      })
      .$promise;
  }

  reboot(projectId, { id: instanceId }, type) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .reboot({
        serviceName: projectId,
        instanceId,
      }, {
        type,
      })
      .$promise;
  }

  getCompatibleRescueImages(projectId, { flavor, image, region }) {
    return this.OvhApiCloudProjectImage
      .v6()
      .query({
        serviceName: projectId,
        flavorType: flavor.type,
        region,
      })
      .$promise
      .then(images => filter(images, {
        visibility: 'public',
        type: image ? image.type : 'linux',
      }));
  }

  rescue(projectId, { id: instanceId }, { id: imageId }) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .rescueMode({
        serviceName: projectId,
        instanceId,
        imageId,
        rescue: true,
      })
      .$promise;
  }

  unrescue(projectId, { id: instanceId }) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .rescueMode({
        serviceName: projectId,
        instanceId,
        rescue: false,
      })
      .$promise;
  }

  activeMonthlyBilling(projectId, { id: instanceId }) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .activeMonthlyBilling({
        serviceName: projectId,
        instanceId,
      })
      .$promise;
  }

  getBackupPriceEstimation(projectId, instance) {
    return this.CucPriceHelper.getPrices(projectId)
      .then((catalog) => {
        const catalogPrice = get(
          catalog,
          `${INSTANCE_BACKUP_CONSUMPTION}.${instance.region}`,
          get(catalog, INSTANCE_BACKUP_CONSUMPTION, false),
        );

        if (catalogPrice) {
          const monthlyPriceValue = catalogPrice.priceInUcents * moment.duration(1, 'months').asHours() / 100000000;
          const totalPriceValue = monthlyPriceValue * instance.flavor.disk;

          return {
            price: catalogPrice.price,
            priceInUcents: catalogPrice.priceInUcents,
            monthlyPrice: {
              ...catalogPrice.price,
              value: monthlyPriceValue,
              text: catalogPrice.price.text.replace(/\d+(?:[.,]\d+)?/, round(monthlyPriceValue.toString(), 2)),
            },
            totalPrice: {
              ...catalogPrice.price,
              value: totalPriceValue,
              text: catalogPrice.price.text.replace(/\d+(?:[.,]\d+)?/, round(totalPriceValue.toString(), 2)),
            },
          };
        }
        return Promise.reject();
      });
  }

  createBackup(projectId, { id: instanceId }, { name: snapshotName }) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .backup({
        serviceName: projectId,
        instanceId,
      }, {
        snapshotName,
      })
      .$promise;
  }

  resume(projectId, { id: instanceId }) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .resume({
        serviceName: projectId,
        instanceId,
      })
      .$promise;
  }

  getPrivateNetworks(projectId) {
    return this.OvhApiCloudProjectNetwork
      .Private()
      .v6()
      .query({
        serviceName: projectId,
      })
      .$promise
      .then(networks => filter(
        networks, {
          type: 'private',
        },
      ));
  }

  getAvailablesPrivateNetworks(projectId, region) {
    return this.getPrivateNetworks(projectId)
      .then(networks => filter(networks, network => find(network.regions, { region, status: 'ACTIVE' })));
  }

  getPublicNetworks(projectId) {
    return this.OvhApiCloudProjectNetwork
      .Public()
      .v6()
      .query({
        serviceName: projectId,
      })
      .$promise;
  }

  getCompatiblesVolumes(projectId, { region }) {
    return this.OvhApiCloudProjectVolume
      .v6()
      .query({
        serviceName: projectId,
        region,
      })
      .$promise
      .then(volumes => map(volumes, volume => new BlockStorage(volume)))
      .then(storages => filter(storages, storage => storage.isAttachable()));
  }

  attachVolume(projectId, { id: volumeId }, { id: instanceId }) {
    return this.OvhApiCloudProjectVolume
      .v6()
      .attach(
        {
          serviceName: projectId,
          volumeId,
        }, {
          instanceId,
        },
      )
      .$promise;
  }

  getVNCInfos(projectId, { id: instanceId }) {
    return this.OvhApiCloudProjectInstance
      .v6()
      .vnc({
        serviceName: projectId,
        instanceId,
      })
      .$promise;
  }

  getInstancePrice(projectId, instance) {
    return this.CucPriceHelper
      .getPrices(projectId)
      .then((prices) => {
        const price = prices[instance.planCode];
        // Set 3 digits for hourly price
        if (!instance.isMonthlyBillingEnabled()) {
          price.price.text = price.price.text.replace(/\d+(?:[.,]\d+)?/, `${price.price.value.toFixed(3)}`);
        }

        return price;
      });
  }

  getProjectQuota(projectId, region = null) {
    return this.OvhApiCloudProjectQuota
      .v6()
      .query({
        serviceName: projectId,
      })
      .$promise
      .then((results) => {
        if (region) {
          return find(results, { region });
        }
        return results;
      });
  }

  getInstanceQuota(projectId, region) {
    return this.getProjectQuota(projectId, region)
      .then(quota => new InstanceQuota(quota.instance));
  }

  getAvailablesRegions(projectId) {
    return this.OvhApiCloudProject
      .Region()
      .v6()
      .query({
        serviceName: projectId,
      })
      .$promise
      .then(regions => this.$q.all(
        map(
          regions,
          region => this.OvhApiCloudProject
            .Region()
            .v6()
            .get({
              serviceName: projectId,
              id: region,
            })
            .$promise,
        ),
      ))
      .then(regions => this.$q.all({
        quotas: this.getProjectQuota(projectId),
        regions,
      }))
      .then(({ quotas, regions }) => map(regions, region => new Region({
        ...region,
        quota: find(quotas, { region: region.name }),
      })));
  }

  save(projectId, instance, privateNetwork, numInstances = 1) {
    const promise = this.getPublicNetworks(projectId)
      .then(publicNetworks => first(publicNetworks));

    if (numInstances > 1) {
      // bulk
    } else {
      // post
    }

    return promise;
  }
}
