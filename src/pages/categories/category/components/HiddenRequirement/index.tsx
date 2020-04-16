import { Field } from 'formfish';
import React from 'react';
import { RequirementWithOptionDetails } from 'ts4ocds/extensions/options';

import Styled from './styles';

const HiddenRequirement = ({ ...requirementProps }: RequirementWithOptionDetails) => (
  <Field
    name={requirementProps.id}
    getters={{ defaultValue: 'defaultChecked' }}
    getValue={({ target: { value } }) => value}
  >
    <Styled.HiddenRequirement type="checkbox" defaultChecked />
  </Field>
);

export default HiddenRequirement;
