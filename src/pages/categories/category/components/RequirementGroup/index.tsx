import React from 'react';
import { RequirementGroup as RequirementGroupProps } from 'ts4ocds/extensions/requirements';
import { Dropdown } from 'ustudio-ui';
import { FieldSet } from 'formfish';

import { sortById } from 'utils';

import Requirement from '../Requirement';

import Styled from './styles';

const RequirementGroup: React.FC<RequirementGroupProps & {
  isActive: boolean;
  setActive: (id: string) => void;
  criterionId: string;
}> = ({ isActive, setActive, id, description, requirements }) => {
  return (
    <Styled.RequirementGroup>
      <Dropdown
        isDefaultOpen={isActive}
        onChange={() => setActive(id)}
        title={
          // `Text` props declaration is broken, so had to ignore the `appearance` error
          // @ts-ignore
          <Styled.Title isActive={isActive} appearance="bold">
            {description || `Variant ${+id.slice(2, 4)}`}
          </Styled.Title>
        }
      >
        <FieldSet name={id}>
          {requirements.length > 1 ? (
            requirements
              .slice(1)
              .sort(sortById)
              .map(requirement => <Requirement {...requirement} key={requirement.id} />)
          ) : (
            <Requirement {...requirements[0]} />
          )}
        </FieldSet>
      </Dropdown>
    </Styled.RequirementGroup>
  );
};

export default RequirementGroup;
