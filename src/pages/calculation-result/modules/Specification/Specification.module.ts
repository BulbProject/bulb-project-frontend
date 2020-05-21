import { Requirement } from 'ts4ocds/extensions/requirements';
import { AvailableVariant, SelectedVariant } from 'types/data';
import { v4 } from 'uuid';

export const egps = ['Prozorro', 'Procuriosity', 'Інша'];

export const modes = ['json', 'rtf'];

export const generateSelectedVariant = ({
  availableVariant,
  requirement,
}: {
  availableVariant: AvailableVariant;
  requirement: Requirement;
}): SelectedVariant => {
  const { criteria: _, ...restAvailableVariants } = availableVariant;

  return {
    ...restAvailableVariants,
    requirementResponses: [
      {
        id: v4(),
        value: requirement.expectedValue,
        requirement: {
          id: requirement.id,
        },
      },
    ],
  };
};
