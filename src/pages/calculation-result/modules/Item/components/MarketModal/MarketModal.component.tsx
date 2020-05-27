import React, { FC } from 'react';

import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';

export const MarketModal: FC<{ id: string; isOpen: boolean; setOpen: (isOpen: boolean) => void }> = ({
  id,
  isOpen,
  setOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onChange={setOpen} title={<Text variant="h5">Prozorro Market</Text>}>
      <Text>Logos go here</Text>
    </Modal>
  );
};
