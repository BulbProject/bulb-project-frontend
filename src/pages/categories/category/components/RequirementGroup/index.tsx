import { Form } from 'formfish';
import React from 'react';
import { RequirementGroup as RequirementGroupProps } from 'ts4ocds/extensions/requirements';
import { Dropdown } from 'ustudio-ui';

import { sortById } from 'utils';

import Requirement from '../Requirement';

import Styled from './styles';

const RequirementGroup: React.FC<RequirementGroupProps & {
  isActive: boolean;
  setActive: (id: string) => void;
}> = ({ isActive, setActive, id, description, requirements }) => {
  return (
    <Styled.RequirementGroup>
      <Dropdown
        isDefaultOpen={isActive}
        onChange={() => setActive(id)}
        title={
          // @ts-ignore
          <Styled.Title isActive={isActive} appearance="bold">
            {description || `Variant ${+id.slice(2, 4)}`}
          </Styled.Title>
        }
      >
        <Form onSubmit={() => {}} name={id}>
          {requirements.length > 1 ? (
            requirements
              .slice(1)
              .sort(sortById)
              .map(requirement => <Requirement {...requirement} key={requirement.id} />)
          ) : (
            <Requirement {...requirements[0]} />
          )}
        </Form>
      </Dropdown>
    </Styled.RequirementGroup>
  );
};

export default RequirementGroup;
