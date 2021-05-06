import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

function getStatusType(status) {
  switch (status) {
    case 'expired':
    case 'delete_at_expiration':
      return 'error';
    case 'auto':
    case 'automatic':
      return 'success';
    case 'manual':
    case 'manualPayment':
      return 'warning';
    case 'billing_suspended':
    case 'forced_manual':
      return 'info';
    default:
      return 'info';
  }
}

function BillingServiceStatus({ t, service }) {
  const renew = service.getRenew();
  const statusType = getStatusType(renew);
  const oneShot = service.isOneShot();
  const hasDebt = service.hasDebt();
  const other = !oneShot && !hasDebt;

  return (
    <>
      {hasDebt && (
        <span className="oui-badge oui-badge_error">
          {t('billing_service_status_pending_debt')}
        </span>
      )}
      {oneShot && '-'}
      {other && (
        <span className={`oui-badge oui-badge_${statusType}`}>
          {t(`billing_service_status_${renew}`)}
        </span>
      )}
    </>
  );
}

BillingServiceStatus.propTypes = {
  t: PropTypes.func,
  service: PropTypes.object,
};

export default withTranslation()(BillingServiceStatus);
