import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';

import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';
import Grid from 'ustudio-ui/components/Grid/Grid';
import Cell from 'ustudio-ui/components/Grid/Cell';

import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';
import Styled from './calculation-modal.styles';

interface CalculationPaybackInterface {
  quantity: number;
  hoursPerDay: number;
  daysPerWeek: number;
  pricePerKwtOnHour: number;
  ledLifeTime: number;
  ledPower: number;
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
  calculationPayback: CalculationPaybackInterface;
}> = ({ isOpen, setOpen, requestedVariant, calculationPayback }) => {
  const { t } = useTranslation('item');

  const [requestedPrice, setRequestedPrice] = useState<null | number | undefined>(null);
  const [ledPrice, setLedPrice] = useState<null | number | undefined>(null);

  const [requestedWarning, setRequestedWarning] = useState(false);
  const [ledPriceWarning, setLedPriceWarning] = useState(false);

  const [paybackPeriod, setPaybackPeriod] = useState<number | undefined>(undefined);

  useEffect(() => {
    setRequestedWarning(typeof requestedPrice === 'number' && requestedPrice < 0.01);
    setLedPriceWarning(typeof ledPrice === 'number' && Number(ledPrice) < 0.01);
  }, [requestedPrice, ledPrice]);

  const onChangeModal = useCallback(() => {
    setRequestedPrice(null);
    setLedPrice(null);
    setPaybackPeriod(0);
    setOpen(false);
  }, []);

  const calculatePayback = (event: FormEvent): void => {
    if (!ledPrice || !requestedPrice) return;

    event.preventDefault();

    const {
      quantity,
      daysPerWeek,
      hoursPerDay,
      ledLifeTime,
      ledPower,
      pricePerKwtOnHour,
      requestedVariantObservations: { lifeTime, power },
    } = calculationPayback;

    const totalPriceForLedSet = quantity * (ledPrice + ledLifeTime * ledPower * pricePerKwtOnHour);
    // eslint-disable-next-line immutable/no-let
    let priceForRequestedBulbSets = 0;
    // eslint-disable-next-line immutable/no-let
    let sets = 1;

    while (priceForRequestedBulbSets <= totalPriceForLedSet) {
      priceForRequestedBulbSets += quantity * (requestedPrice + lifeTime * power * pricePerKwtOnHour);
      sets += 1;
    }

    const paybackPeriodInHours = sets * lifeTime;

    setPaybackPeriod(paybackPeriodInHours / (hoursPerDay * daysPerWeek * weeksPerYear));
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChangeModal}
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
                      {/* eslint-disable-next-line no-warning-comments */}
                      {/* TODO: Need refactor */}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t('paybackPeriod', {
                            count: Number(paybackPeriod.toFixed(2)),
                            interpolation: { escapeValue: true },
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
            <label htmlFor="requesting">
              {t('insert-requesting-price')}
              {requestedVariant}
            </label>
            <Styled.Input
              isRequired
              placeholder={t('input-placeholder')}
              id="requesting"
              onChange={setRequestedPrice}
              suffix="грн"
              inputMode="decimal"
            />
            <Styled.WarningContainer margin={{ bottom: 'medium' }}>
              {requestedWarning && (
                <Text variant="small" style={{ color: '#e3871a' }}>
                  {t('price-warning')}
                </Text>
              )}
            </Styled.WarningContainer>

            <label htmlFor="led">{t('insert-led-price')}</label>
            <Styled.Input
              isRequired
              placeholder={t('input-placeholder')}
              id="led"
              onChange={setLedPrice}
              suffix="грн"
              inputMode="decimal"
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
