import type { Requirement } from 'ts4ocds/extensions/requirements';
import type { AvailableVariant, SelectedVariant } from 'types/data';
import { v4 } from 'uuid';

export const egps = ['Prozorro', 'Procuriosity', 'Інша'];

export const modes = [
  { value: 'json', title: 'Ідентифікатор' },
  { value: 'rtf', title: 'Текстовий документ' },
];

export const generateSelectedVariant = ({
  availableVariant,
  requirement,
}: {
  availableVariant: AvailableVariant;
  requirement: Requirement;
}): SelectedVariant => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
