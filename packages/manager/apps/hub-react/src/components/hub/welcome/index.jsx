import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

import context from 'src/context';
import translations from './translations';

function loadTranslations() {
  return fetch(translations[i18n.language] || translations.en_GB)
    .then((res) => res.json())
    .then((resource) =>
      i18n.addResourceBundle(i18n.language, i18n.options.defaultNS, resource),
    );
}

function HubWelcome({ t }) {
  const [translationLoaded, setTranslationLoaded] = useState(false);
  const { user } = context.getEnvironment();
  useEffect(() => {
    loadTranslations().then(() => setTranslationLoaded(true));
  }, []);

  return (
    <h1 className="oui-heading_2">
      {translationLoaded &&
        t('hub_welcome_title', {
          name: user.firstname,
        })}
    </h1>
  );
}

HubWelcome.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(HubWelcome);
