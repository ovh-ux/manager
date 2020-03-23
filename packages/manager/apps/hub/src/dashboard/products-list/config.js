import find from 'lodash/find';
import get from 'lodash/get';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import startCase from 'lodash/startCase';

import { ListLayoutHelper } from '@ovh-ux/manager-ng-layout-helpers';
import { DEFAULT_NUMBER_OF_COLUMNS } from './constants';

const matchingTypes = {
  boolean: 'boolean',
  enum: 'string',
  long: 'number',
  string: 'string',
};

const mapApiProperties = (properties) =>
  map(properties, (value, name) => ({
    title: name,
    property: name,
    type: /Enum/.test(value.type)
      ? matchingTypes.enum
      : matchingTypes[value.type],
    searchable: true,
    filterable: true,
    sortable: true,
  }));

const getFirstColumnTemplate = (propertyId) => ({
  title: propertyId,
  property: propertyId,
  template: `
      <a data-ng-href="{{ $row.managerLink }}" data-ng-bind="$row.${propertyId}"></a>
    `,
  searchable: true,
  filterable: true,
  sortable: 'asc',
});

export const urlQueryParams = `columns&${ListLayoutHelper.urlQueryParams}`;

export const params = {
  columns: {
    squash: true,
    value: '[]',
  },
  ...ListLayoutHelper.stateParams,
};

export const component = 'hubProductListing';

export const resolves = {
  products: /* @ngInject */ (productType, services) =>
    services.data.data[productType].data,
  resourcePath: /* @ngInject */ (products) => get(head(products), 'route.path'),
  propertyId: /* @ngInject */ (products) => get(head(products), 'propertyId'),
  dataModel: /* @ngInject */ (resourcePath, schema) => {
    const model = get(
      find(get(find(schema.apis, { path: resourcePath }), 'operations'), {
        httpMethod: 'GET',
      }),
      'responseType',
    );
    return schema.models[model];
  },
  displayedColumns: /* @ngInject */ ($transition$) =>
    JSON.parse($transition$.params().columns),
  onColumnChange: /* @ngInject */ ($state, $transition$) => (id, columns) =>
    $state.go('.', {
      ...$transition$.params(),
      columns: JSON.stringify(
        map(
          columns.filter(({ hidden }) => !hidden),
          'name',
        ),
      ),
    }),
  loadRow: /* @ngInject */ (products, propertyId) => (service) => ({
    ...service,
    managerLink: get(
      products.find(({ resource }) => resource.name === service[propertyId]),
      'url',
    ),
  }),
  columns: /* @ngInject */ (dataModel, displayedColumns, propertyId) => {
    const columns = mapApiProperties(dataModel.properties).filter(
      ({ title, type }) => type && title !== propertyId,
    );
    columns.unshift(getFirstColumnTemplate(propertyId));
    return columns.map((column, index) => ({
      ...column,
      title: startCase(column.title),
      hidden: isEmpty(displayedColumns)
        ? index > DEFAULT_NUMBER_OF_COLUMNS
        : !displayedColumns.includes(column.title),
    }));
  },
};

export default {
  urlQueryParams,
  params,
  component,
  resolves,
};
