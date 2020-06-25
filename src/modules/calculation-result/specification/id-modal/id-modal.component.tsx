import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { css } from 'styled-components';

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
  identificator: string;
  isCopying: boolean;
  setCopying(value: boolean): void;
  setAlertOpen(value: boolean): void;
  setIdentificator(identificator: string): void;
}> = ({ identificator, isCopying, setAlertOpen, setCopying, setIdentificator }) => {
  const idRef = useRef<HTMLTextAreaElement | null>(null);

  const [isTooltipShown, setTooltipShown] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isTooltipShown) {
      const tooltipTimeout = setTimeout(() => setTooltipShown(false), 2 * 1000);

      return () => clearTimeout(tooltipTimeout);
    }
  }, [isTooltipShown]);

  return (
    <Modal
      isOpen={isCopying && Boolean(identificator)}
      onChange={() => {
        setCopying(false);
        setAlertOpen(false);
        setIdentificator('');
      }}
      title={<Text variant="h5">Ідентифікатор</Text>}
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
        <textarea spellCheck="false" rows={1} ref={idRef} value={identificator} onChange={() => undefined} />

        <Styled.Tooltip isShown={isTooltipShown}>Скопійовано!</Styled.Tooltip>

        <Text variant="small" align="center">
          Скопіюйте цей ідентифікатор та вставте його на майданчику, де збираєтеся проводити закупівлю.
        </Text>

        <Styled.SmallBold variant="small" align="center">
          Майте на увазі - дані за цим ідентифікатором зберігаються 7 днів.
        </Styled.SmallBold>

        <Styled.CopyButton
          onClick={() => {
            copyIdToClipboard(idRef);

            setTooltipShown(true);
          }}
          iconAfter={<CopyIcon />}
        >
          Скопіювати
        </Styled.CopyButton>
      </SpecificationStyles.Group>
    </Modal>
  );
};
