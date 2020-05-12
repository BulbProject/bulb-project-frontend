import React from 'react';
import { Field } from 'formfish';
import { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Styled from './HiddenRequirement.styles';

export const HiddenRequirement = ({
  isInteractive = false,
  ...requirementProps
}: RequirementWithOptionDetails & { isInteractive?: boolean }) => {
  return (
    <Field
      name={requirementProps.id}
      renderInput={() => (
        <Styled.HiddenRequirement type="checkbox" isInteractive={isInteractive} onChange={console.log} />
      )}
    />
  );
};
