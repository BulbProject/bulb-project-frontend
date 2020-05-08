import React from 'react';

import { css } from 'styled-components';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

import { AvailableVariant, Item as IItem } from 'types/data';
import { Classification } from 'shared';

import { Forecasts } from '../Forecasts';

import Styled from './Item.styles';

export const Item = ({ variant, item, document }: { variant: AvailableVariant; item: IItem; document?: string }) => {
  return (
    <Styled.Item direction="column">
      <Styled.Image link={document} />

      <Styled.Content direction="column">
        <Styled.ItemDescription>
          <Text variant="h3">{item.description}</Text>
        </Styled.ItemDescription>

        <Flex margin={{ bottom: 'regular', top: 'regular' }}>
          <Text variant="h6">Кількість: {variant.quantity}</Text>
        </Flex>

        <Styled.Classifications direction="column">
          <Flex margin={{ bottom: 'regular' }} direction="column">
            <Flex margin={{ bottom: 'regular' }}>
              <Text variant="caption">Класифікація</Text>
            </Flex>

            <Classification {...item.classification} />
          </Flex>

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
        </Styled.Classifications>

        <Forecasts forecasts={variant.forecasts} />

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
