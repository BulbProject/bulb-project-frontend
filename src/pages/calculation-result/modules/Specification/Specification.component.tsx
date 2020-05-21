import React, { FC, useState } from 'react';
import { css } from 'styled-components';
import Modal from 'ustudio-ui/components/Modal';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import Tabs from 'ustudio-ui/components/Tabs';
import Select from 'ustudio-ui/components/Select/Select';

import { formats, systems } from './Specification.module';
import { SpecificationProps } from './Specification.types';
import Styled from './Specification.styles';

export const Specification: FC<SpecificationProps> = ({ isOpen, setOpen, criterion }) => {
  const [lightingVariant, setLightingVariant] = useState(criterion.requirementGroups[0].requirements[0].id);
  const [system, setSystem] = useState(systems[0]);
  const [format, setFormat] = useState(formats[0]);

  return (
    <Modal
      isOpen={isOpen}
      onChange={setOpen}
      title={<Text variant="h5">{criterion.title}</Text>}
      styled={{
        Modal: css`
          width: 33%;
        `,
        Overlay: css`
          background-color: var(--c-darkest);
        `,
      }}
    >
      <Flex direction="column" alignment={{ horizontal: 'center' }}>
        <Styled.Group>
          <Styled.GroupTitle>{criterion.description}</Styled.GroupTitle>

          <Tabs
            // Tabs props declaration miss this prop
            // @ts-ignore
            variant="body"
            active={lightingVariant}
            tabs={criterion.requirementGroups
              .flatMap(({ requirements }) => requirements)
              .map(({ id, title }) => ({
                value: id,
                children: <Styled.Tab>{title}</Styled.Tab>,
              }))}
            onChange={setLightingVariant}
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
            items={systems.reduce((items, title) => {
              return Object.assign(items, {
                [title]: {
                  value: title,
                  label: title,
                  isDisabled: title === 'Procuriosity',
                },
              });
            }, {})}
            value={system}
            onChange={setSystem}
          />
        </Styled.Group>

        <Styled.Group>
          <Styled.GroupTitle>Оберіть бажаний формат</Styled.GroupTitle>

          <Tabs
            // @ts-ignore
            variant="body"
            active={format}
            disabledTabs={[formats[1]]}
            tabs={formats.map((title) => ({
              value: title,
              children: <Styled.Tab>{title}</Styled.Tab>,
            }))}
            onChange={setFormat}
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
  );
};
