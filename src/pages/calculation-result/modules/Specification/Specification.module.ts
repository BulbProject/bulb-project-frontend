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

export const formatDateTime = () => {
  const toDouble = (number: number): string => (number < 10 ? `0${number}` : `${number}`);

  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  return `${day}.${toDouble(month)}.${year} ${hour}_${toDouble(minute)}_${toDouble(second)}`;
};
