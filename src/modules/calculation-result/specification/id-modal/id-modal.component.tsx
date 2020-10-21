import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';

import CopyIcon from '../../../../assets/icons/copy.inline.svg';

import Styled from './id-modal.styles';
import SpecificationStyles from '../specification.styles';

const copyIdToClipboard = <R extends MutableRefObject<HTMLTextAreaElement | null>>(ref: R): void => {
  (ref.current as HTMLTextAreaElement).select();

  document.execCommand('copy');

  (ref.current as HTMLTextAreaElement).blur();
};

export const IdModal: FC<{
  identifier: string;
  isCopying: boolean;
  setCopying(value: boolean): void;
  setAlertOpen(value: boolean): void;
  setIdentifier(identifier: string): void;
}> = ({ identifier, isCopying, setAlertOpen, setCopying, setIdentifier }) => {
  const idRef = useRef<HTMLTextAreaElement | null>(null);

  const [isTooltipShown, setTooltipShown] = useState(false);
  const { t } = useTranslation('id-modal');

  useEffect(() => {
    if (isTooltipShown) {
      const tooltipTimeout = setTimeout(() => setTooltipShown(false), 2 * 1000);

      return () => clearTimeout(tooltipTimeout);
    }
  }, [isTooltipShown]);

  return (
    <Modal
      isOpen={isCopying && Boolean(identifier)}
      onChange={() => {
        setCopying(false);
        setIdentifier('');
        setAlertOpen(false);
      }}
      title={<Text variant="h5">{t('id')}</Text>}
      styled={{
        Modal: css`
          z-index: calc(var(--l-topmost) + 2);
        `,
        Overlay: css`
          background-color: var(--c-darkest);
          ${isCopying ? 'z-index: calc(var(--l-topmost) + 1) !important;' : ''};
        `,
      }}
    >
      <SpecificationStyles.Group>
        <textarea spellCheck="false" rows={1} ref={idRef} value={identifier} onChange={() => undefined} />

        <Styled.Tooltip isShown={isTooltipShown}>{t('copied')}</Styled.Tooltip>

        <Text variant="small" align="center">
          {t('copy-id')}
        </Text>

        <Styled.SmallBold variant="small" align="center">
          {t('id-expires-in-7-days')}
        </Styled.SmallBold>

        <Styled.CopyButton
          onClick={() => {
            copyIdToClipboard(idRef);

            setAlertOpen(true);
            setTooltipShown(true);
          }}
          iconAfter={<CopyIcon />}
        >
          {t('copy')}
        </Styled.CopyButton>
      </SpecificationStyles.Group>
    </Modal>
  );
};
