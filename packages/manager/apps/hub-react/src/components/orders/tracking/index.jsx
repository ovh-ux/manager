import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { withTranslation } from 'react-i18next';
import { maxBy } from 'lodash-es';

import { buildURL } from '@ovh-ux/ufrontend/url-builder';
import { getLastOrder } from 'src/datasource/orders';
import context from 'src/context';
import style from './index.module.scss';

function OrdersTracking({ t }) {
  const { isLoading, error, data: lastOrder } = useQuery(
    'last-order',
    getLastOrder,
  );

  let lastOrderURL;
  let currentStatus;
  let lastOrderTrackingURL;

  if (!isLoading) {
    const { applicationURLs } = context.getEnvironment();
    lastOrderURL = buildURL(applicationURLs.dedicated, '#/billing/orders');
    currentStatus = maxBy(lastOrder.history, 'date') || {
      date: lastOrder.date,
      label:
        lastOrder.status === 'delivered'
          ? 'INVOICE_IN_PROGRESS'
          : 'custom_creation',
    };
    lastOrderTrackingURL = buildURL(
      applicationURLs.dedicated,
      `#/billing/order/${lastOrder.orderId}`,
    );
  }

  return (
    <div className={`oui-tile text-center ${style.bluebg}`}>
      <h3 className="oui-heading_4">{t('orders_tracking_title')}</h3>
      {error && (
        <div className="oui-message oui-message_error" role="alert">
          <span>{t('orders_tracking_error')}</span>
        </div>
      )}
      {lastOrder && (
        <>
          <a className="oui-badge oui-badge_info" href={lastOrderURL}>
            <small>
              {t('orders_tracking_order_id', { orderId: lastOrder.orderId })}
            </small>
          </a>
          <div className="mb-3 d-flex justify-content-center flex-wrap">
            <span className="font-weight-bold mr-1 mt-4">
              {currentStatus.date}
            </span>
            <span className="mr-1">
              {t(`orders_tracking_history_${currentStatus.label}`)}
            </span>
          </div>
          <a
            className="oui-button oui-button_primary oui-button_icon-right"
            href={lastOrderTrackingURL}
          >
            <span>{t('orders_tracking_show_all')}</span>
            <span
              className="oui-icon oui-icon-arrow-right"
              aria-hidden="true"
            ></span>
          </a>
        </>
      )}
      {!lastOrder && (
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
      )}
    </div>
  );
}

OrdersTracking.propTypes = {
  t: PropTypes.func,
};

export default withTranslation(['orders-tracking'])(OrdersTracking);
