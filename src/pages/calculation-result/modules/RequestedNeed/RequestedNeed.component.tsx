import React from 'react';
import { css } from 'styled-components';
import Drawer from 'ustudio-ui/components/Drawer';
import Flex from 'ustudio-ui/components/Flex';
import useMediaQuery from 'ustudio-ui/hooks/use-media-query';

import { Item as ItemType } from 'types/data';
import FilterIcon from '../../../../assets/icons/filter.inline.svg';
import { FormValidationContextProvider } from 'context/FormValidation';

import { Filter } from '../Filter';
import { Item } from '../Item';

import { RequestedNeedProps } from './RequestedNeed.types';
import Styled from './RequestedNeed.styles';

export const RequestedNeed: React.FC<RequestedNeedProps> = ({
  hasMany,
  isDrawerOpen,
  setDrawerOpen,
  recalculationError,
  isRecalculating,
  setSubmitting,
  category,
  requestedNeed,
  setNewRequestedNeed,
}) => {
  const isLg = useMediaQuery('screen and (min-width: 832px)');

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
          position={isLg ? 'left' : 'right'}
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

          <FormValidationContextProvider>
            <Filter
              error={recalculationError}
              isLoading={isRecalculating}
              setSubmitting={setSubmitting}
              recalculate={(state) => {
                setNewRequestedNeed(state);
                setDrawerOpen(false);
              }}
            />
          </FormValidationContextProvider>
        </Drawer>
      </Flex>

      <Item
        isRequested
        variant={requestedNeed}
        item={category.items.find((item) => item.id === requestedNeed.relatedItem) as ItemType}
        document={
          category.documents?.find((document) => {
            return document.relatesTo === 'item' && document.relatedItem === requestedNeed.relatedItem;
          })?.url
        }
      />
    </Styled.RequestedNeed>
  );
};
