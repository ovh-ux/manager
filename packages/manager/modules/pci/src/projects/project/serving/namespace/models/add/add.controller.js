import filter from 'lodash/filter';
import get from 'lodash/get';
import uniq from 'lodash/uniq';

import {
  PRESET_IMAGE,
  BUILD_IMAGE,
  EXTENSION,
  FOLDER_MODE,
  FILE_MODE,
  COMPATIBILITY_GUIDE_URL,
} from './add.constants';

export default class PciServingNamespaceModelsAddController {
  /* @ngInject */
  constructor(
    $translate,
    OvhManagerPciServingModelsService,
    PciProjectStorageContainersService,
    atInternet,
  ) {
    this.$translate = $translate;
    this.OvhManagerPciServingModelsService = OvhManagerPciServingModelsService;
    this.PciProjectStorageContainersService = PciProjectStorageContainersService;
    this.atInternet = atInternet;
    this.PRESET_IMAGE = PRESET_IMAGE;
    this.BUILD_IMAGE = BUILD_IMAGE;
    this.FOLDER_MODE = FOLDER_MODE;
    this.FILE_MODE = FILE_MODE;
    this.COMPATIBILITY_GUIDE_URL = COMPATIBILITY_GUIDE_URL;
  }

  $onInit() {
    this.mode = this.FOLDER_MODE;

    this.isAdding = false;

    this.model = {
      id: null,
      storagePath: null,
      flavor: null,
      framework: null,
      backend: null,
      workflowTemplate: null,
      image: null, // Preset
      autoscalingSpec: {
        minReplicas: 1,
        maxReplicas: 3,
        memoryAverageUtilization: 60,
        cpuAverageUtilization: 60,
      },
    };

    this.advancedConfigurationAutoscalerSpec = false;

    this.frameworks = filter(
      this.frameworks,
      (framework) => framework.id !== 'flow',
    );
    [this.model.framework] = this.frameworks;
    this.onChangeFramework(this.model.framework);
    this.backendVisible = false;

    this.workflowTemplates = [this.BUILD_IMAGE, this.PRESET_IMAGE];

    this.error = false;
    this.folders = [];
    this.files = [];
    this.getContainerFiles();
  }

  getContainerFiles() {
    this.containerLoading = true;
    this.PciProjectStorageContainersService.getContainer(
      this.projectId,
      this.namespace.containerId,
    )
      .then((container) => {
        this.folders = uniq(
          container.objects
            .map(({ name }) => {
              const split = name.split('/');
              split.pop();
              return split.join('/');
            })
            .filter((path) => path !== ''),
        );

        this.files = container.objects
          .map(({ name }) => name)
          .filter((path) => {
            for (let i = 0; i < EXTENSION.length; i += 1) {
              if (path.endsWith(EXTENSION[i])) {
                return true;
              }
            }
            return false;
          });
      })
      .finally(() => {
        this.containerLoading = false;
      });
  }

  onClickAdvancedConfigurationAutoscalerSpecHandler() {
    this.advancedConfigurationAutoscalerSpec = !this
      .advancedConfigurationAutoscalerSpec;
  }

  addModel() {
    this.atInternet.trackClick({
      name:
        'public-cloud::pci::projects::project::serving::namespace::models:add::submit',
      type: 'action',
    });

    this.error = false;
    this.isAdding = true;

    let modelCreation;
    if (this.model.workflowTemplate === this.PRESET_IMAGE) {
      // Preset image
      modelCreation = {
        id: this.model.id,
        storagePath: this.model.storagePath,
        flavor: this.model.flavor.id,
        workflowTemplate: this.model.workflowTemplate,
        imageId: this.model.image.id,
        autoscalingSpec: this.model.autoscalingSpec,
      };
    } else {
      // Build image
      modelCreation = {
        id: this.model.id,
        storagePath: this.model.storagePath,
        flavor: this.model.flavor.id,
        framework: this.model.framework.id,
        backend: this.model.backend.id,
        workflowTemplate: this.model.workflowTemplate,
        autoscalingSpec: this.model.autoscalingSpec,
      };
    }

    return this.OvhManagerPciServingModelsService.add(
      this.projectId,
      this.namespaceId,
      modelCreation,
    )
      .then(() =>
        this.goBack(
          this.$translate.instant(
            'pci_projects_project_serving_namespace_models_add_success',
          ),
        ),
      )
      .catch((error) => {
        this.error = get(error, 'data.message');
      })
      .finally(() => {
        this.isAdding = false;
      });
  }

  resetMode() {
    this.model.storagePath = null;
  }

  getPrice(id) {
    return this.pricesCatalog[`ai-serving-engine.${id}.hour.consumption`]
      .priceInUcents;
  }

  getTax(id) {
    return this.pricesCatalog[`ai-serving-engine.${id}.hour.consumption`].tax;
  }

  onChangeFramework(framework) {
    this.model.backend = this.backends.find(
      (backend) => backend.id === framework.recommendedBackend,
    );
  }

  isFlavorDisabled(flavor) {
    return this.model.workflowTemplate !== this.PRESET_IMAGE ||
      this.model.image === null
      ? false
      : this.model.image.ramRequirementMB > flavor.ramMB;
  }
}
