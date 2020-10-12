import React, { FC } from 'react';

import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';
import TextInput from 'ustudio-ui/components/Input/TextInput';

import { useTranslation } from 'react-i18next';
import { css } from 'styled-components';

export const CalculationModal: FC<{
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  requestedVariant: string | undefined;
}> = ({ isOpen, setOpen, requestedVariant }) => {
  const { t } = useTranslation('item');

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
      <Flex isWrap alignment={{ vertical: 'space-around' }} padding={{ left: 'large', right: 'large' }}>
        <label htmlFor="requesting">
          {t('insert-requesting-price')}
          {requestedVariant}
        </label>
        <TextInput isRequired placeholder="Insert price for 1 pcs." name="requesting" />

        <label htmlFor="led">{t('insert-led-price')}</label>
        <TextInput isRequired placeholder="Insert price for 1 pcs." name="led" />
      </Flex>
    </Modal>
  );
};
