import { Form } from 'formfish';
import React, { Dispatch, SetStateAction } from 'react';
import { RequirementGroup as RequirementGroupProps } from 'ts4ocds/extensions/requirements';
import { Dropdown } from 'ustudio-ui';
import { sortById } from '../../../../../utils';

import Requirement from '../Requirement';

import Styled from './styles';

const RequirementGroup: React.FC<RequirementGroupProps & {
  isActive: boolean;
  setActive: Dispatch<SetStateAction<string>>;
}> = ({ isActive, setActive, id, description, requirements }) => {
  return (
    <Styled.RequirementGroup>
      <Dropdown
        isDefaultOpen={isActive}
        onChange={() => setActive(id)}
        title={
          <Styled.Title isActive={isActive} variant="h5">
            {description || `Variant ${+id.slice(2, 4)}`}
          </Styled.Title>
        }
      >
        <Form onSubmit={() => {}} name={id}>
          {requirements
            .slice(1)
            .sort(sortById)
            .map(requirement => (
              <Requirement {...requirement} key={requirement.id} />
            ))}
        </Form>
      </Dropdown>
    </Styled.RequirementGroup>
  );
};

export default RequirementGroup;
