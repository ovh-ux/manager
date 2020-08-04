import { get, map, set } from 'lodash';
import { ROUTING_TYPES } from './constants';
import { IPV4_BLOCK_REGEX, ASN_MIN } from '../../../cloud-connect.constants';

export default class CloudConnectDacenterAddExtraCtrl {
  /* @ngInject */
  constructor($translate, cloudConnectService) {
    this.$translate = $translate;
    this.cloudConnectService = cloudConnectService;
    this.ROUTING_TYPES = ROUTING_TYPES;
    this.ASN_MIN = ASN_MIN;
    this.IPV4_BLOCK_REGEX = IPV4_BLOCK_REGEX.RANGE_0_TO_28;
    this.IPV4_NO_RANGE_REGEX = IPV4_BLOCK_REGEX.NO_RANGE;
  }

  $onInit() {
    if (this.extraType) {
      map(this.ROUTING_TYPES, (type) => {
        if (type.id !== this.extraType) {
          set(type, 'available', false);
        }
      });
    }
  }

  create() {
    this.isLoading = true;
    const options = {
      bgpNeighborArea: this.bgpNeighborArea,
      bgpNeighborIp: this.bgpNeighborIp,
      nextHop: this.nextHop,
      subnet: this.subnet,
      type: this.type.id,
    };
    return this.cloudConnectService
      .createDatacenterConfigurationExtra(
        this.cloudConnectId,
        this.popId,
        this.datacenterId,
        options,
      )
      .then((task) => {
        const extraConf = this.datacenter.createExtraConfiguration({
          ...options,
          id: task.resourceId,
          status: 'init',
        });
        this.datacenter.addExtraConfiguration(extraConf);
        return this.goBack(
          {
            textHtml: this.$translate.instant(
              'cloud_connect_datacenter_add_routing_success',
              {
                tasksUrl: this.tasksHref,
              },
            ),
          },
          'success',
          false,
        ).then(() => {
          if (task) {
            this.cloudConnectService
              .checkTaskStatus(this.cloudConnectId, task.id)
              .finally(() => {
                extraConf.setActive();
              });
          }
        });
      })
      .catch((error) =>
        this.goBack(
          this.$translate.instant(
            'cloud_connect_datacenter_add_routing_error',
            {
              message: get(error, 'data.message', error.message),
            },
          ),
          'error',
        ),
      )
      .finally(() => {
        this.isLoading = false;
      });
  }
}
