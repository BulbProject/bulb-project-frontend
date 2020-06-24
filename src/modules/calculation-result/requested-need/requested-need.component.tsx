import React from 'react';
import { css } from 'styled-components';
import Drawer from 'ustudio-ui/components/Drawer';
import Flex from 'ustudio-ui/components/Flex';
import { useMedia } from 'shared/hooks';

import { useCategory } from 'core/context/category-provider';
import type { AvailableVariant, Item as ItemType } from 'shared/entity/data';
import { FormValidator } from 'shared/context/form-validator';
import FilterIcon from '../../../assets/icons/filter.inline.svg';

import { Filter } from '../filter';
import { Item } from '../item';

import Styled from './requested-need.styles';

export const RequestedNeed: React.FC<{
  hasMany: boolean;
  isDrawerOpen: boolean;
  setDrawerOpen: (isDrawerOpen: boolean) => void;
  requestedNeed: AvailableVariant;
}> = ({ hasMany, isDrawerOpen, setDrawerOpen, requestedNeed }) => {
  const { category } = useCategory();

  const isLg = useMedia('screen and (min-width: 832px)');

  return (
    <Styled.RequestedNeed direction="column">
      <Flex
        alignment={{ horizontal: 'space-between', vertical: 'center' }}
        margin={{ bottom: 'large', top: 'regular' }}
        padding={hasMany ? { left: 'regular' } : undefined}
      >
        <Styled.Title
          variant="body"
          // Another bug in props types
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          appearance="bold"
        >
          Те, що Ви шукали
        </Styled.Title>

        <Styled.FilterButton appearance="text" onClick={() => setDrawerOpen(!isDrawerOpen)} iconAfter={<FilterIcon />}>
          Змінити умови
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
      </Flex>

      <Item
        isRequested
        variant={requestedNeed}
        item={category.items.find((item) => item.id === requestedNeed.relatedItem) as ItemType}
        document={
          (category?.documents ?? []).find((document) => {
            return document.relatesTo === 'item' && document.relatedItem === requestedNeed.relatedItem;
          })?.url
        }
      />
    </Styled.RequestedNeed>
  );
};
