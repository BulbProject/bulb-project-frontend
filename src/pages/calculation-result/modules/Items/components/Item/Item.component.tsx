import React from 'react';

import { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

import { AvailableVariant, Item as IItem } from 'types/data';
import { Classification } from 'shared';

import { Metrics } from '../Metrics';

import Styled from './Item.styles';

export const Item = ({
  variant,
  item,
  document,
  isSearched,
}: {
  variant: AvailableVariant;
  item: IItem;
  document?: string;
  isSearched?: boolean;
}) => {
  return (
    <Styled.Item direction="column" isSearched={!!isSearched}>
      <Styled.Image link={document} />

      <Styled.Content direction="column">
        <Styled.ItemDescription>
          <Text variant="h3">{item.description}</Text>

          <Flex margin={{ top: 'medium' }} alignment={{ horizontal: 'center' }}>
            <Text variant="h6">Кількість: {variant.quantity}</Text>
          </Flex>
        </Styled.ItemDescription>

        <Styled.Classifications direction="column">
          <Flex direction="column">
            <Flex margin={{ bottom: 'regular' }}>
              <Text variant="caption">Класифікація</Text>
            </Flex>

            <Classification {...item.classification} />
          </Flex>
        </Styled.Classifications>

        <Metrics metrics={variant.metrics} />

        {item.additionalClassifications && (
          <Styled.AdditionalClassification direction="column">
            <Flex margin={{ bottom: 'regular' }}>
              <Text variant="caption">Додаткові класифікації</Text>
            </Flex>

            {item.additionalClassifications.map((additionalClassification) => (
              <Classification key={additionalClassification.id} {...additionalClassification} />
            ))}
          </Styled.AdditionalClassification>
        )}

        <Flex direction="column">
          <Styled.Link href="#" target="_blank" rel="noopener noreferrer">
            <Button
              styled={{
                Button: css`
                   {
                    width: 100%;
                    padding: var(--i-regular);
                  }
                `,
              }}
              appearance="text"
            >
              Prozorro Market Teaser
            </Button>
          </Styled.Link>

          <Button
            styled={{
              Button: css`
                 {
                  padding: var(--i-regular);
                }
              `,
            }}
            appearance="text"
            intent="positive"
          >
            Contract Notice
          </Button>
        </Flex>
      </Styled.Content>
    </Styled.Item>
  );
};
