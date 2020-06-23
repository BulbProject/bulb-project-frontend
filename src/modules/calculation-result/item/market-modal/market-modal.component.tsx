import React, { FC } from 'react';
import { css } from 'styled-components';

import Modal from 'ustudio-ui/components/Modal';
import Text from 'ustudio-ui/components/Text';
import Flex from 'ustudio-ui/components/Flex';

import EtenderLogo from '../../../../assets/images/market/etender.png';
import SmartTenderLogo from '../../../../assets/images/market/smarttender.png';
import DzoLogo from '../../../../assets/images/market/dzo.png';
import Zakupkipromua from '../../../../assets/images/market/zakupkipromua.png';
import TenderonlineLogo from '../../../../assets/images/market/tenderonline.png';
import TendersallbizLogo from '../../../../assets/images/market/tendersallbiz.png';

import Styled from './market-modal.styles';

const marketLinks = [
  {
    title: 'E-Tender',
    href: 'https://e-tender.biz/login',
    image: EtenderLogo,
  },
  {
    title: 'SmartTender',
    href: 'https://smarttender.biz/prozorro-market/chastyny-do-svitylnykiv-ta-osvitlyuvalnogo-obladnannya/',
    image: SmartTenderLogo,
  },
  {
    title: 'Держзакупівлі Онлайн',
    href: 'https://www.dzo.com.ua/tenders/catalog/categories/31530000-0/31530000-662194-40996564',
    image: DzoLogo,
  },
  {
    title: 'Zakupki',
    href: 'https://zakupki.prom.ua/ecatalog/gov/list/5e1dd1ff58cc6ef6f4cff14d/5e1dd1ff58cc6ef6f4cff14c',
    image: Zakupkipromua,
  },
  {
    title: 'Tender Online',
    href: 'https://tender-online.com.ua/catalogue/categories/31520000-7/profiles/31520000-599890-40996564',
    image: TenderonlineLogo,
  },
  {
    title: 'TendersAllBiz',
    href: 'https://tenders.all.biz/catalogue/categories/31530000-0/profiles/31530000-662194-40996564',
    image: TendersallbizLogo,
  },
];

export const MarketModal: FC<{ isOpen: boolean; setOpen: (isOpen: boolean) => void }> = ({ isOpen, setOpen }) => {
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
      <Flex isWrap alignment={{ horizontal: 'space-around' }} padding={{ left: 'large', right: 'large' }}>
        {marketLinks.map((props) => (
          <Styled.Link {...props} key={props.title} rel="noreferrer noopener" target="_blank" />
        ))}
      </Flex>
    </Modal>
  );
};
