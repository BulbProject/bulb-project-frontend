import React, { FC } from 'react';
import type { Metric } from 'ts4ocds/extensions/metrics';

import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import { formatNumber } from 'shared/utils/format-number';

import Styled from './benefits.styles';

export const Benefits: FC<{ benefits: Metric[] }> = ({ benefits }) => {
  return (
    <Styled.BenefitsContainer>
      {benefits.map((metric) => (
        <Styled.Benefit key={metric.id} $backgroundColor={metric.id === 'energyEconomy' ? 'secondary' : 'primary'}>
          <Styled.BenefitTitle variant="small">{metric.title}</Styled.BenefitTitle>

          {metric.observations.map(({ id, notes, measure, unit, value }) => (
            <Flex key={id} alignment={{ horizontal: 'space-between', vertical: 'end' }}>
              <Styled.BenefitNote>{notes ?? ''}</Styled.BenefitNote>

              {unit ?? value ? (
                <div style={{ whiteSpace: 'nowrap' }}>
                  <Text appearance="bold">{formatNumber((measure as number) || value?.amount)}</Text>{' '}
                  <Text variant="small">{unit?.name ?? value?.currency}</Text>
                </div>
              ) : (
                <Flex alignment={{ vertical: 'center', horizontal: 'end' }}>
                  <Styled.BoldText variant="small">x&nbsp;</Styled.BoldText>

                  <Styled.BenefitTimesMeasure>{formatNumber(measure as number)}</Styled.BenefitTimesMeasure>
                </Flex>
              )}
            </Flex>
          ))}
        </Styled.Benefit>
      ))}
    </Styled.BenefitsContainer>
  );
};
