import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import context from 'src/context';

function HubWelcome({ t }) {
  const { user } = context.getEnvironment();

  return (
    <h1 className="oui-heading_2">
      {t('hub_welcome_title', {
        name: user.firstname,
      })}
    </h1>
  );
}

HubWelcome.propTypes = {
  t: PropTypes.func,
};

export default withTranslation(['welcome'])(HubWelcome);
