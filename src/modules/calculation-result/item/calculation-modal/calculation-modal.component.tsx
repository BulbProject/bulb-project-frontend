import React, { FC, FormEvent, useEffect, useState } from 'react';

import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import Button from 'ustudio-ui/components/Button';
import TextInput from 'ustudio-ui/components/Input/TextInput';

import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';
import Styled from './calculation-modal.styles';

export const CalculationModal: FC<{
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  requestedVariant: string | undefined;
}> = ({ isOpen, setOpen, requestedVariant }) => {
  const { t } = useTranslation('item');

  const [requestedPrice, setRequestedPrice] = useState<string>();
  const [ledPrice, setLedPrice] = useState<string>();

  const [firstFiledWarning, setFirstFieldWarning] = useState(false);
  const [secondFiledWarning, setSecondFieldWarning] = useState(false);

  useEffect(() => {
    if (Number(requestedPrice) < 0.01) {
      setFirstFieldWarning(true);
    } else {
      setFirstFieldWarning(false);
    }
    if (Number(ledPrice) < 0.01) {
      setSecondFieldWarning(true);
    } else {
      setSecondFieldWarning(false);
    }
  }, [requestedPrice, ledPrice]);

  const calculatePayback = (event: FormEvent) => {
    event.preventDefault();
    console.log(requestedPrice, ledPrice);
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={setOpen}
      title={<Text variant="h5">{t('payback-calculator')}</Text>}
      styled={{
        Overlay: css`
          background-color: var(--c-darkest);
        `,
      }}
    >
      <Flex isWrap padding={{ left: 'large', right: 'large' }} direction="column">
        <form onSubmit={calculatePayback}>
          <label htmlFor="requesting">
            {t('insert-requesting-price')}
            {requestedVariant}
          </label>
          <TextInput
            isRequired
            placeholder="Insert price for 1 pcs."
            id="requesting"
            onChange={setRequestedPrice}
            suffix="грн"
          />
          <Styled.WarningContainer margin={{ bottom: 'medium' }}>
            {firstFiledWarning && (
              <Text variant="small" style={{ color: '#e3871a' }}>
                {t('price-warning')}
              </Text>
            )}
          </Styled.WarningContainer>

          <label htmlFor="led">{t('insert-led-price')}</label>
          <TextInput isRequired placeholder="Insert price for 1 pcs." id="led" onChange={setLedPrice} suffix="грн" />
          <Styled.WarningContainer margin={{ bottom: 'medium' }}>
            {secondFiledWarning && (
              <Text variant="small" style={{ color: '#e3871a' }}>
                {t('price-warning')}
              </Text>
            )}
          </Styled.WarningContainer>
          <Button isDisabled={firstFiledWarning && secondFiledWarning}>{t('calculate')}</Button>
        </form>
      </Flex>
    </Modal>
  );
};
