import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

function BillingServiceDate({ t, service }) {
  const oneShot = service.isOneShot();
  const resiliated = service.isResiliated();
  const pendingResiliation = service.hasPendingResiliation();
  const manualRenew = service.hasManualRenew();
  const autorenew = service.hasAutomaticRenewal();
  const hasDebt = service.hasDebt();

  if (service.isBillingSuspended()) return '';

  return (
    <>
      {oneShot && !resiliated && !pendingResiliation && <span>-</span>}
      {manualRenew && !resiliated && !hasDebt && (
        <span>
          {t('billing_service_date_before', {
            date: service.formattedExpiration,
          })}
        </span>
      )}
      {(resiliated || pendingResiliation) && (
        <span>
          {t('billing_service_date_renew', {
            date: service.formattedExpiration,
          })}
        </span>
      )}
      {autorenew &&
        !oneShot &&
        !hasDebt &&
        !resiliated &&
        !pendingResiliation && <span>{service.formattedExpiration}</span>}
      {hasDebt && <span>{t('billing_service_date_now')}</span>}
    </>
  );
}

BillingServiceDate.propTypes = {
  t: PropTypes.func,
  service: PropTypes.object,
};

export default withTranslation(['billing-services'])(BillingServiceDate);
