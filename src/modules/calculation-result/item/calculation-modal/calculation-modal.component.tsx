import React, { FC, FormEvent, useEffect, useState } from 'react';

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
    lifeTime: string | number | undefined;
    power: string | number | undefined;
  };
}

export const CalculationModal: FC<{
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  requestedVariant: string | undefined;
  calculationPaybackData: CalculationPaybackInterface;
}> = ({ isOpen, setOpen, requestedVariant, calculationPaybackData: data }) => {
  const { t } = useTranslation('item');

  const [requestedPrice, setRequestedPrice] = useState<number | undefined | null>(null);
  const [ledPrice, setLedPrice] = useState<number | undefined | null>(null);

  const [firstFiledWarning, setFirstFieldWarning] = useState(false);
  const [secondFiledWarning, setSecondFieldWarning] = useState(false);

  const [paybackPeriod, setPaybackPeriod] = useState(0);

  const weeksPerYear = 52;

  useEffect(() => {
    if (requestedPrice !== null && Number(requestedPrice) < 0.01) {
      setFirstFieldWarning(true);
    } else {
      setFirstFieldWarning(false);
    }

    if (ledPrice !== null && Number(ledPrice) < 0.01) {
      setSecondFieldWarning(true);
    } else {
      setSecondFieldWarning(false);
    }
  }, [requestedPrice, ledPrice]);

  const onChangeModal = (): void => {
    setRequestedPrice(null);
    setLedPrice(null);
    setPaybackPeriod(0);
    setOpen(false);
  };

  const calculatePayback = (event: FormEvent): void => {
    event.preventDefault();

    const totalPriceForLedSet =
      data.quantity * (Number(ledPrice) + data.ledLifeTime * data.ledPower * data.pricePerKwtOnHour);
    // eslint-disable-next-line immutable/no-let
    let priceForRequestedBulbs = 0;
    // eslint-disable-next-line immutable/no-let
    let parties = 1;

    while (priceForRequestedBulbs <= totalPriceForLedSet) {
      priceForRequestedBulbs +=
        data.quantity *
        (Number(requestedPrice) +
          Number(data.requestedVariantObservations.lifeTime) *
            Number(data.requestedVariantObservations.power) *
            data.pricePerKwtOnHour);
      parties += 1;
    }
    const SaveTime = parties * Number(data.requestedVariantObservations.lifeTime);

    setPaybackPeriod(SaveTime / (data.hoursPerDay * data.daysPerWeek * weeksPerYear));
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
      {paybackPeriod !== 0 ? (
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
                    <Text>{data.hoursPerDay}</Text>
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
                    <Text>{data.daysPerWeek}</Text>
                  </Flex>
                </Cell>
              </Grid>
            </Cell>
            <Cell>
              <Grid xs={{ gap: 16 }}>
                <Cell>
                  <Flex>
                    <Text variant="h6">
                      {/* Temporary solution */}
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
              {firstFiledWarning && (
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
              {secondFiledWarning && (
                <Text variant="small" style={{ color: '#e3871a' }}>
                  {t('price-warning')}
                </Text>
              )}
            </Styled.WarningContainer>
            <Flex alignment={{ horizontal: 'center' }}>
              <Button style={{ margin: 'auto' }} isDisabled={firstFiledWarning || secondFiledWarning}>
                {t('calculate')}
              </Button>
            </Flex>
          </form>
        </Flex>
      )}
    </Modal>
  );
};
