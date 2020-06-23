import React, { FC } from 'react';
import { css } from 'styled-components';
import type { Observation } from 'ts4ocds/extensions/metrics';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { formatNumber } from 'shared/utils/format-number';

import Styled from './economy.styles';

const getUnit = (observation: Observation): string => {
  return observation.unit?.name ?? observation.value?.currency ?? '';
};

export const Economy: FC<{ economyObservations: Observation[] }> = ({ economyObservations }) => {
  return (
    <Styled.EconomyContainer>
      {economyObservations.map((observation) => (
        <Styled.Economy
          key={observation.id}
          $backgroundColor={observation.id === 'energyEconomy' ? 'secondary' : 'primary'}
        >
          <Styled.EconomyNote variant="small">{observation.notes}</Styled.EconomyNote>

          <Styled.EconomyMeasure>
            {getUnit(observation) ? (
              <Text appearance="bold">
                {formatNumber((observation.measure as number) || observation.value?.amount)}
              </Text>
            ) : (
              <Flex alignment={{ vertical: 'center', horizontal: 'end' }}>
                <Styled.BoldText variant="small">x&nbsp;</Styled.BoldText>

                <Styled.EconomyTimesMeasure>
                  {formatNumber((observation.measure as number) || observation.value?.amount)}
                </Styled.EconomyTimesMeasure>
              </Flex>
            )}

            {getUnit(observation) && (
              <Styled.EconomyUnit
                variant="small"
                styled={{
                  Text: css`
                    white-space: nowrap;
                  `,
                }}
              >
                {getUnit(observation)}
              </Styled.EconomyUnit>
            )}
          </Styled.EconomyMeasure>
        </Styled.Economy>
      ))}
    </Styled.EconomyContainer>
  );
};
