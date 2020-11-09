import React, { FC } from 'react';
import { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Drawer from 'ustudio-ui/components/Drawer';

import { FormValidator } from 'shared/context/form-validator';
import { useMedia } from 'shared/hooks';
import FilterIcon from '../../../assets/icons/filter.inline.svg';

import { Filter } from '../filter';
import Styled from './filter-drawer.styles';

export const FilterDrawer: FC<{
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
  isRequestedNeedAbsent: boolean;
}> = ({ isDrawerOpen, setDrawerOpen, isRequestedNeedAbsent }) => {
  const isLg = useMedia('screen and (min-width: 832px)');
  const { t } = useTranslation('calculation-result');

  return (
    <>
      <Styled.FilterButton
        appearance="text"
        onClick={() => setDrawerOpen(!isDrawerOpen)}
        iconAfter={<FilterIcon />}
        isRequestedNeedAbsent={isRequestedNeedAbsent}
      >
        {t('change-conditions')}
      </Styled.FilterButton>

      <Drawer
        isOpen={isDrawerOpen}
        onChange={() => setDrawerOpen(false)}
        showOverlay
        position={isLg() ? 'left' : 'right'}
        styled={{
          Drawer: css`
            width: 320px;
            z-index: var(--l-topmost);
          `,
          Overlay: css`
            background-color: var(--c-darkest);

            z-index: calc(var(--l-topmost) - 1);
          `,
        }}
      >
        <Styled.DrawerButton onClick={() => setDrawerOpen(false)} />

        <FormValidator>
          <Filter recalculate={() => setDrawerOpen(false)} />
        </FormValidator>
      </Drawer>
    </>
  );
};
