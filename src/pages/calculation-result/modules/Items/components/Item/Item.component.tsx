import React from 'react';

import type { Document } from 'ts4ocds';

import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';

import { AvailableVariant, Item as IItem } from 'types/data';
import { Classification } from 'shared/Classification';

import { Forecasts } from '../Forecasts';

import Styled from './Item.styles';

export const Item = ({ variant, item, document }: { variant: AvailableVariant; item: IItem; document?: Document }) => {
  return (
    <Styled.Item direction="column">
      <Styled.Image link={document?.url} />

      <Styled.Content direction="column">
        <Styled.ItemDescription>
          <Text variant="h3">{item.description}</Text>
        </Styled.ItemDescription>

        <Styled.Classifications direction="column">
          <Flex margin={{ bottom: 'regular' }} direction="column">
            <Flex margin={{ bottom: 'regular' }}>
              <Text variant="caption"> Класифікація</Text>
            </Flex>

            <Classification {...item.classification} />
          </Flex>

          {item.additionalClassifications && (
            <Flex margin={{ bottom: 'regular' }} direction="column">
              <Flex margin={{ bottom: 'regular' }}>
                <Text variant="caption"> Додаткові класифікації</Text>
              </Flex>

              {item.additionalClassifications.map((additionalClassification) => (
                <Classification key={additionalClassification.id} {...additionalClassification} />
              ))}
            </Flex>
          )}
        </Styled.Classifications>

        <Flex margin={{ bottom: 'regular', top: 'regular' }}>
          <Text variant="h6">Quantity: {variant.quantity}</Text>
        </Flex>

        <Forecasts forecasts={variant.forecasts} />

        <Flex margin={{ bottom: 'regular' }} alignment={{ horizontal: 'center' }}>
          <Button appearance="text"> Prozorro Market Teaser</Button>
        </Flex>

        <Button appearance="text" intent="positive">
          Contract Notice
        </Button>
      </Styled.Content>
    </Styled.Item>
  );
};
