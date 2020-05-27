import React, { FC } from 'react';
import { css } from 'styled-components';

import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import DzoLogo from '../../../../../../assets/images/market/dzo.png';
import SmartTenderLogo from '../../../../../../assets/images/market/smarttender.svg';

import Styled from './MarketModal.styles';

const marketLinks = [
  {
    link: {
      title: 'Держзакупівлі Онлайн',
      href: 'https://www.dzo.com.ua/tenders/catalog/categories/31530000-0/31530000-662194-40996564',
    },
    img: DzoLogo,
  },
  {
    link: {
      title: 'SmartTender',
      href: 'https://smarttender.biz/prozorro-market/chastyny-do-svitylnykiv-ta-osvitlyuvalnogo-obladnannya/',
    },
    img: SmartTenderLogo,
  },
];

export const MarketModal: FC<{ id: string; isOpen: boolean; setOpen: (isOpen: boolean) => void }> = ({
  id,
  isOpen,
  setOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onChange={setOpen}
      title={<Text variant="h5">Prozorro Market</Text>}
      styled={{
        Overlay: css`
          background-color: var(--c-darkest);
        `,
      }}
    >
      <Flex alignment={{ horizontal: 'space-around' }} padding={{ left: 'large', right: 'large' }}>
        {marketLinks.map(({ link, img }) => (
          <Styled.Link {...link} key={link.title} rel="noreferrer noopener" target="_blank">
            <Styled.Logo src={img} alt={link.title} />

            <Text variant="h6">{link.title}</Text>
          </Styled.Link>
        ))}
      </Flex>
    </Modal>
  );
};
