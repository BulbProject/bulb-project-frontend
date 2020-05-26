import React from 'react';

import Button from 'ustudio-ui/components/Button';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

import Styled from './Error.styles';

export const Error = ({ reloadCategories }: { reloadCategories: () => void }) => {
  return (
    <Styled.ErrorContainer>
      <Flex direction="column" alignment={{ horizontal: 'center' }}>
        <Text color="var(--c-contrast-strong)">На жаль, ми не замогли завантажити список категорій.</Text>

        <Flex alignment={{ horizontal: 'center' }} margin={{ top: 'large' }}>
          <Button intent="positive" onClick={reloadCategories}>
            Спробувати ще
          </Button>
        </Flex>
      </Flex>
    </Styled.ErrorContainer>
  );
};
