import React, { FC, useEffect, useState } from 'react';
import { css } from 'styled-components';
import { useParams } from 'react-router-dom';

import Modal from 'ustudio-ui/components/Modal';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Tabs from 'ustudio-ui/components/Tabs';
import Select from 'ustudio-ui/components/Select/Select';
import Button from 'ustudio-ui/components/Button';
import Spinner from 'ustudio-ui/components/Spinner';
import Alert from 'ustudio-ui/components/Alert';

import { useRequest } from 'hooks';
import { postSpecification } from 'config';
import { Mixin } from 'ustudio-ui/theme';

import { modes, egps, generateSelectedVariant } from './Specification.module';
import type { SpecificationProps } from './Specification.types';
import Styled from './Specification.styles';

export const Specification: FC<SpecificationProps> = ({ isOpen, setOpen, criterion, availableVariant }) => {
  const { categoryId, version } = useParams();

  const [requirement, setRequirement] = useState(criterion.requirementGroups[0].requirements[0]);
  const [egp, setEgp] = useState(egps[0].toLowerCase());
  const [mode, setMode] = useState(modes[0]);

  const [isRequesting, setRequesting] = useState(false);

  const { isLoading, error } = useRequest(
    postSpecification({
      categoryId,
      version,
      egp,
      mode,
      body: {
        selectedVariant: generateSelectedVariant({ availableVariant, requirement }),
      },
    }),
    {
      isRequesting: isRequesting && isOpen,
      isDefaultLoading: false,
    }
  );

  useEffect(() => {
    if (isRequesting && !error) {
      setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  }, [isRequesting, error]);

  return (
    <>
      <Alert
        isOpen={isRequesting && !isLoading}
        onChange={() => setRequesting(false)}
        verticalPosition={mode === 'json' ? 'top' : 'bottom'}
        horizontalPosition={mode === 'json' ? 'center' : 'left'}
        intent={error ? 'negative' : 'positive'}
      >
        {error ? 'Упс, щось пішло не так...' : 'Успіх!'}
      </Alert>

      <Modal
        isOpen={isOpen}
        onChange={setOpen}
        title={<Text variant="h5">{criterion.title}</Text>}
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
            <Button onClick={() => setRequesting(true)}>Згенерувати</Button>
          </Flex>
        }
      >
        <Styled.Overlay isActive={isLoading}>
          <Spinner />
        </Styled.Overlay>

        <Flex direction="column" alignment={{ horizontal: 'center' }}>
          <Styled.Group>
            <Styled.GroupTitle>{criterion.description}</Styled.GroupTitle>

            <Tabs
              // Tabs props declaration miss this prop
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
          </Styled.Group>

          <Styled.Group>
            <Styled.GroupTitle>Виберіть систему</Styled.GroupTitle>

            <Select
              items={egps.reduce((items, title) => {
                return Object.assign(items, {
                  [title.toLowerCase()]: {
                    value: title.toLowerCase(),
                    label: title,
                    isDisabled: title === 'Procuriosity',
                  },
                });
              }, {})}
              value={egp}
              onChange={setEgp}
            />
          </Styled.Group>

          <Styled.Group>
            <Styled.GroupTitle>Оберіть бажаний формат</Styled.GroupTitle>

            <Tabs
              // @ts-ignore
              variant="body"
              active={mode}
              disabledTabs={[modes[1]]}
              tabs={modes.map((title) => ({
                value: title,
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
          </Styled.Group>
        </Flex>
      </Modal>
    </>
  );
};
