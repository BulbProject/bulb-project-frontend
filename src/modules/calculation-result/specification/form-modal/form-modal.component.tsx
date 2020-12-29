import React, { FC, ReactElement } from 'react';
import { css } from 'styled-components';
import { Criterion } from 'ts4ocds/extensions/requirements';
import { useTranslation } from 'react-i18next';

import Flex from 'ustudio-ui/components/Flex';
import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

import { Loader } from 'shared/components/loader';

import { modes } from '../entity';
import SpecificationStyles from '../specification.styles';

import Styled from './form-modal.styles';

export const FormModal: FC<{
  isOpen: boolean;
  isLoading: boolean;
  criterion?: Criterion;
  mode: string;
  setOpen(value: boolean): void;
  setDownloading(value: boolean): void;
  setMode(mode: string): void;
  setCopying(value: boolean): void;
}> = ({ isOpen, isLoading, criterion, setMode, setOpen, setDownloading, setCopying }) => {
  const { t } = useTranslation('calculation-result');

  return (
    <Modal
      isOpen={isOpen}
      onChange={() => {
        setOpen(false);
        setDownloading(false);
      }}
      title={<Text variant="h5">{criterion?.title ?? t('documentation')}</Text>}
      styled={{
        Modal: css`
            width: 100%;

            ${Mixin.Screen.xs(css`
              width: 75%;
            `)}

            ${Mixin.Screen.md(css`
              width: 66%;
            `)}

            ${Mixin.Screen.lg(css`
              width: 50%;
            `)}

            ${Mixin.Screen.xl(css`
              width: 33%;
            `)}
          `,
        Overlay: css`
          background-color: var(--c-darkest);
        `,
      }}
    >
      <Flex alignment={{ horizontal: 'center' }} direction="column">
        <SpecificationStyles.Group>
          <Styled.GroupTitle>{t('select-format')}</Styled.GroupTitle>

          <Flex direction="row" alignment={{ horizontal: 'stretch' }}>
            <Styled.Button
              intent="positive"
              onClick={() => {
                setMode(modes[0].value);
                setCopying(true);
              }}
            >
              {t(modes[0].title)}
            </Styled.Button>

            <Styled.Button
              onClick={() => {
                setMode(modes[1].value);
                setDownloading(true);
              }}
            >
              {t(modes[1].title)}
            </Styled.Button>
          </Flex>
        </SpecificationStyles.Group>
      </Flex>

      {(isLoading && <Loader size={32} />) as ReactElement}
    </Modal>
  );
};
