import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

import Styled from './language-select.styles';

export const LanguageSelect: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e: ChangeEvent<HTMLSelectElement>): void => {
    i18n.changeLanguage(e.target.value).catch((error) => console.log(error));
  };

  return (
    <Styled.SelectContainer>
      <select onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="ua">Ukraine</option>
      </select>
    </Styled.SelectContainer>
  );
};
