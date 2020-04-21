import React from 'react';
import { Field } from 'formfish';
import { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Styled from './HiddenRequirement.styles';

export const HiddenRequirement = ({ ...requirementProps }: RequirementWithOptionDetails) => (
  <Field
    name={requirementProps.id}
    getters={{ defaultValue: 'defaultChecked' }}
    getValue={({ target: { value } }) => value}
  >
    <Styled.HiddenRequirement type="checkbox" defaultChecked />
  </Field>
);
