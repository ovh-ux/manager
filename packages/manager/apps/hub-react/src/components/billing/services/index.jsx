import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { withTranslation } from 'react-i18next';

import { get as getBillingServices } from 'src/datasource/billing/services';

import BillingStatus from './status';
import BillingServiceDate from './date';

function renderTableSkeleton() {
  return (
    <>
      <div className="oui-skeleton oui-skeleton_auto">
        <div className="oui-skeleton__loader"></div>
      </div>
      <div className="oui-skeleton oui-skeleton_auto">
        <div className="oui-skeleton__loader"></div>
      </div>
      <div className="oui-skeleton oui-skeleton_auto">
        <div className="oui-skeleton__loader"></div>
      </div>
    </>
  );
}

function renderError() {
  return (
    <div className="oui-message oui-message_error" role="alert">
      <span>Une erreur est survenue</span>
    </div>
  );
}

function renderTable({ services, t }) {
  return (
    <table className="oui-table">
      <tbody>
        {services.map((service) => {
          return (
            <tr className="oui-table_row" key={service.serviceId}>
              <td className="oui-table_cell">
                <a href={service.url}>{service.serviceId}</a>
                <br />
                <small>
                  {t(`billing_services_products_${service.serviceType}`)}
                </small>
              </td>
              <td className="oui-table_cell">
                <BillingStatus service={service} />
                <small className="d-block">
                  <BillingServiceDate service={service} />
                </small>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function BillingServices({ t, billingUrl }) {
  const { isLoading, error, data: services } = useQuery(
    'billing-services',
    getBillingServices,
  );

  return (
    <div className="oui-tile">
      <h4 className="oui-tile__title">
        <span>{t('billing_services_title')}</span>
        {!isLoading && (
          <span className="oui-badge oui-badge_info ml-3">
            {services.length}
          </span>
        )}
        <a
          className="oui-button oui-button_icon-right oui-button_ghost float-right"
          href={billingUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>{t('billing_services_show_all')}</span>
          <span
            className="oui-icon oui-icon-arrow-right"
            aria-hidden="true"
          ></span>
        </a>
      </h4>
      {error && renderError(error)}
      {isLoading
        ? renderTableSkeleton()
        : !error && renderTable({ services, t })}
    </div>
  );
}

BillingServices.propTypes = {
  t: PropTypes.func,
  billingUrl: PropTypes.string,
};

export default withTranslation(['billing-services'])(BillingServices);
