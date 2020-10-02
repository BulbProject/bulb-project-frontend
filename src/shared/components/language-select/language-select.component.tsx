import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Styled from './language-select.styles';

export const LanguageSelect: FC = () => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = ({ target: { value } }: ChangeEvent<HTMLSelectElement>): void => {
    i18n.changeLanguage(value).catch(console.error);
    setLanguage(value);
  };

  const languages = ['en', 'ua'];

  return (
    <Styled.SelectContainer>
      <select value={language} onChange={changeLanguage}>
        {languages.map((lang) => {
          return (
            <option key={lang} value={lang}>
              {lang}
            </option>
          );
        })}
      </select>
    </Styled.SelectContainer>
  );
};
