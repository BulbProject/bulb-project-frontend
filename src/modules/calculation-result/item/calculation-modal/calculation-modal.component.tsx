import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';
import Grid from 'ustudio-ui/components/Grid/Grid';
import Cell from 'ustudio-ui/components/Grid/Cell';

import Styled from './calculation-modal.styles';

interface CalculationPayback {
  quantity: number;
  hoursPerDay: number;
  daysPerWeek: number;
  pricePerKwtOnHour: number;
  requestedLifeTime: number;
  requestedPower: number;
  requestedVariantObservations: {
    lifeTime: number;
    power: number;
  };
}

const weeksPerYear = 52;

export const CalculationModal: FC<{
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  requestedVariant: string | undefined;
  calculationPayback: CalculationPayback;
  currentBulbName: string | undefined;
}> = ({ isOpen, setOpen, requestedVariant, calculationPayback, currentBulbName }) => {
  const { t } = useTranslation('calculation-result');

  const [requestedPrice, setRequestedPrice] = useState<null | number | undefined>(null);
  const [selectedPrice, setSelectedPrice] = useState<null | number | undefined>(null);

  const [requestedWarning, setRequestedWarning] = useState(false);
  const [ledPriceWarning, setLedPriceWarning] = useState(false);

  const [paybackPeriod, setPaybackPeriod] = useState<number | undefined>(undefined);

  useEffect(() => {
    setRequestedWarning(typeof requestedPrice === 'number' && requestedPrice < 0.01);
  }, [requestedPrice]);

  useEffect(() => {
    setLedPriceWarning(typeof selectedPrice === 'number' && Number(selectedPrice) < 0.01);
  }, [selectedPrice]);

  const onModalChange = useCallback(() => {
    setRequestedPrice(null);
    setSelectedPrice(null);
    setPaybackPeriod(0);
    setOpen(false);
  }, []);

  const calculatePayback = useCallback(
    (event: FormEvent) => {
      if (!selectedPrice || !requestedPrice) return;

      event.preventDefault();

      const {
        quantity,
        daysPerWeek,
        hoursPerDay,
        requestedLifeTime,
        requestedPower,
        pricePerKwtOnHour,
        requestedVariantObservations: { lifeTime, power },
      } = calculationPayback;

      const totalPriceForLedSet = quantity * (selectedPrice + requestedLifeTime * requestedPower * pricePerKwtOnHour);
      /* eslint immutable/no-let: 0 */
      let priceForRequestedBulbSets = 0;
      let sets = 1;

      while (priceForRequestedBulbSets <= totalPriceForLedSet) {
        priceForRequestedBulbSets += quantity * (requestedPrice + lifeTime * power * pricePerKwtOnHour);
        sets += 1;
      }

      const paybackPeriodInHours = sets * lifeTime;

      setPaybackPeriod(paybackPeriodInHours / (hoursPerDay * daysPerWeek * weeksPerYear));
    },
    [selectedPrice, requestedPrice]
  );

  return (
    <Modal
      isOpen={isOpen}
      onChange={onModalChange}
      title={<Text variant="h5">{t('payback-calculator')}</Text>}
      styled={{
        Overlay: css`
          background-color: var(--c-darkest);
        `,
      }}
    >
      {paybackPeriod ? (
        <Flex isWrap padding={{ left: 'large', right: 'large' }} direction="column">
          <Grid xs={{ direction: 'column', gap: 16 }}>
            <Cell>
              <Flex>
                <Text>{t('conditionOfUse')}</Text>
              </Flex>
            </Cell>
            <Cell>
              <Grid xs={{ gap: 16 }}>
                <Cell>
                  <Flex>
                    <Text>{t('hr/day')}</Text>
                  </Flex>
                </Cell>
                <Cell>
                  <Flex>
                    <Text>{calculationPayback.hoursPerDay}</Text>
                  </Flex>
                </Cell>
              </Grid>
            </Cell>
            <Cell>
              <Grid xs={{ gap: 16 }}>
                <Cell>
                  <Flex>
                    <Text>{t('day/week')}</Text>
                  </Flex>
                </Cell>
                <Cell>
                  <Flex>
                    <Text>{calculationPayback.daysPerWeek}</Text>
                  </Flex>
                </Cell>
              </Grid>
            </Cell>
            <Cell>
              <Grid xs={{ gap: 16 }}>
                <Cell>
                  <Flex>
                    <Text variant="h6">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t('paybackPeriod', {
                            count: Number(paybackPeriod.toFixed(2)),
                          }),
                        }}
                      />
                    </Text>
                  </Flex>
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        </Flex>
      ) : (
        <Flex isWrap padding={{ left: 'large', right: 'large' }} direction="column">
          <form onSubmit={calculatePayback}>
            <label htmlFor="requested">
              {t('insert-requesting-price')}
              {requestedVariant}
            </label>
            <Styled.Input
              isRequired
              placeholder={t('input-placeholder')}
              id="requested"
              onChange={setRequestedPrice}
              suffix={t('uah')}
              inputMode="decimal"
              styled={{
                Suffix: css`
                  font-weight: 600;
                `,
              }}
            />
            <Styled.WarningContainer margin={{ bottom: 'medium' }}>
              {requestedWarning && (
                <Text variant="small" style={{ color: '#e3871a' }}>
                  {t('price-warning')}
                </Text>
              )}
            </Styled.WarningContainer>

            <label htmlFor="selected">
              {t('insert-requesting-price')}
              {currentBulbName}
            </label>
            <Styled.Input
              isRequired
              placeholder={t('input-placeholder')}
              id="selected"
              onChange={setSelectedPrice}
              suffix={t('uah')}
              inputMode="decimal"
              styled={{
                Suffix: css`
                  font-weight: 600;
                `,
              }}
            />
            <Styled.WarningContainer margin={{ bottom: 'medium' }}>
              {ledPriceWarning && (
                <Text variant="small" style={{ color: '#e3871a' }}>
                  {t('price-warning')}
                </Text>
              )}
            </Styled.WarningContainer>
            <Flex alignment={{ horizontal: 'center' }}>
              <Button isDisabled={requestedWarning || ledPriceWarning}>{t('calculate')}</Button>
            </Flex>
          </form>
        </Flex>
      )}
    </Modal>
  );
};
