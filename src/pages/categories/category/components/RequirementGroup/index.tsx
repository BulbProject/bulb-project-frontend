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
}> = ({ isActive, setActive, id, description, requirements }) => {
  const hasSingleRequirement = () => requirements.length === 1;

  return (
    <Styled.RequirementGroup>
      <Dropdown
        isDefaultOpen={isActive}
        onChange={() => setActive(id)}
        title={
          // `Text` props declaration is broken, so had to ignore the `appearance` error
          // @ts-ignore
          <Styled.Title isActive={isActive} appearance="bold">
            {description || requirements[0].title}
          </Styled.Title>
        }
      >
        <FieldSet name={id}>
          {!hasSingleRequirement() ? (
            requirements
              .slice(1)
              .sort(sortById)
              .map(requirement => <Requirement {...requirement} key={requirement.id} />)
          ) : (
            // Component here seems to think it's a NumberRequirement only
            // @ts-ignore
            <Requirement
              {...{
                ...requirements[0],
                title: '',
                expectedValue: requirements[0].dataType === 'boolean' ? true : undefined,
              }}
            />
          )}
        </FieldSet>
      </Dropdown>
    </Styled.RequirementGroup>
  );
};

export default RequirementGroup;
