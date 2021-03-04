import React, { useRef, useState } from 'react';
import useClickAway from 'react-use/lib/useClickAway';

import { Environment, LANGUAGES } from '@ovh-ux/manager-config';
import { emit } from '@ovh-ux/ufrontend/communication';
import { MESSAGES } from './constants';

import LanguageButton from './language/button.jsx';
import LanguageList from './language/list.jsx';

function LanguageMenu() {
  const ref = useRef();
  const [currentLanguage, setCurrentLanguage] = useState(
    LANGUAGES.available.find(({ key }) => key === Environment.getUserLocale()),
  );
  const [show, setShow] = useState(false);
  const handleRootClose = () => setShow(false);

  useClickAway(ref, handleRootClose);

  const availableLanguages = LANGUAGES.available.filter(
    ({ key }) => key !== Environment.getUserLocale(),
  );

  const selectNewLang = (locale) => {
    setCurrentLanguage(LANGUAGES.available.find(({ key }) => key === locale));
    emit({
      id: MESSAGES.localeChange,
      locale,
    });
  };

  return (
    <div className="oui-navbar-dropdown" ref={ref}>
      <LanguageButton show={show} onClick={(nextShow) => setShow(nextShow)}>
        {currentLanguage.name}
      </LanguageButton>
      <LanguageList
        languages={availableLanguages}
        onSelect={(locale) => selectNewLang(locale)}
      ></LanguageList>
    </div>
  );
}

export default LanguageMenu;
