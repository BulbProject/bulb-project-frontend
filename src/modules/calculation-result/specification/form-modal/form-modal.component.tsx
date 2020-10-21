import React, { FC, ReactElement } from 'react';
import { css } from 'styled-components';
import { Criterion, Requirement } from 'ts4ocds/extensions/requirements';
import { useTranslation } from 'react-i18next';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Modal from 'ustudio-ui/components/Modal';
import Tabs from 'ustudio-ui/components/Tabs';
import Text from 'ustudio-ui/components/Text';
import { Mixin } from 'ustudio-ui/theme';

import { Loader } from 'shared/components/loader';

import { modes } from '../entity';
import SpecificationStyles from '../specification.styles';

import Styled from './form-modal.styles';

export const FormModal: FC<{
  isOpen: boolean;
  isLoading: boolean;
  requirement?: Requirement;
  criterion?: Criterion;
  mode: string;
  setOpen(value: boolean): void;
  setDownloading(value: boolean): void;
  setRequirement(requirement: Requirement): void;
  setMode(mode: string): void;
  setCopying(value: boolean): void;
}> = ({
  isOpen,
  isLoading,
  requirement,
  criterion,
  mode,
  setOpen,
  setDownloading,
  setRequirement,
  setMode,
  setCopying,
}) => {
  const { t } = useTranslation('common');

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
      footer={
        // Conflicts with prettier
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Flex alignment={{ horizontal: 'center' }}>
          <Button
            onClick={() => {
              if (mode === 'docx') {
                setDownloading(true);
              }

              if (mode === 'json') {
                setCopying(true);
              }
            }}
          >
            Generate
          </Button>
        </Flex>
      }
    >
      {(isLoading && <Loader size={32} />) as ReactElement}

      <Flex direction="column" alignment={{ horizontal: 'center' }}>
        {criterion && (
          <SpecificationStyles.Group>
            <Styled.GroupTitle>{criterion.description}</Styled.GroupTitle>

            <Tabs
              // Tabs props declaration miss this prop
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              variant="body"
              active={JSON.stringify(requirement)}
              tabs={criterion.requirementGroups
                .flatMap(({ requirements }) => requirements)
                .map((tabRequirement) => ({
                  value: JSON.stringify(tabRequirement),
                  children: <Styled.Tab>{tabRequirement.title}</Styled.Tab>,
                }))}
              onChange={(value: string) => setRequirement(JSON.parse(value))}
              styled={{
                Tabs: css`
                  &:before {
                    background: var(--c-primary);
                  }
                `,
              }}
            />
          </SpecificationStyles.Group>
        )}

        <SpecificationStyles.Group>
          <Styled.GroupTitle>Select the desired format</Styled.GroupTitle>

          <Tabs
            // Tabs props declaration miss this prop
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            variant="body"
            active={mode}
            tabs={modes.map(({ value, title }) => ({
              value,
              children: <Styled.Tab>{title}</Styled.Tab>,
            }))}
            onChange={setMode}
            styled={{
              Tabs: css`
                &:before {
                  background: var(--c-secondary);
                }
              `,
              Tab: ({ isActive }) => css`
                &:hover {
                  color: ${isActive ? 'var(--c-white)' : 'var(--c-secondary)'};
                }
              `,
            }}
          />
        </SpecificationStyles.Group>
      </Flex>
    </Modal>
  );
};
