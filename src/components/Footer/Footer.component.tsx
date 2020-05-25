import React from 'react';

import Styled from './Footer.styles';

import ProzorroLogo from '../../assets/images/partners/prozorro.png';
import MeGovLogo from '../../assets/images/partners/me-gov.png';
import TiUkraineLogo from '../../assets/images/partners/transparency-ua.png';
import OpenContractingLogo from '../../assets/images/partners/open-contracting.png';
import EbrdLogo from '../../assets/images/partners/ebrd.png';
import IcfLogo from '../../assets/images/partners/icf.png';
import CpbLogo from '../../assets/images/partners/cpb.png';
import UstudioLogo from '../../assets/images/partners/ustudio.svg';

export const Footer = () => {
  const partners = [
    {
      title: 'prozorro',
      image: ProzorroLogo,
      href: 'https://prozorro.gov.ua/en',
    },
    {
      title: 'me-gov',
      image: MeGovLogo,
      href: 'https://www.me.gov.ua',
      width: 12,
    },
    {
      title: 'cpb',
      image: CpbLogo,
      href: 'https://cpb.org.ua',
    },
    {
      title: 'ti-ukraine',
      image: TiUkraineLogo,
      href: 'https://ti-ukraine.org',
    },
    {
      title: 'open-contracting',
      image: OpenContractingLogo,
      href: 'https://open-contracting.org',
    },
    {
      title: 'ustudio',
      image: UstudioLogo,
      href: 'https://ustudio.company',
      height: 3,
    },
    {
      title: 'ebrd',
      image: EbrdLogo,
      href: 'https://ebrd.com',
      width: 10
    },
    {
      title: 'icf',
      image: IcfLogo,
      href: 'https://icf.com',
      height: 3,
    },
  ];

  return (
    <Styled.Footer>
      <Styled.FooterContent alignment={{ vertical: 'center' }}>
        {partners.map(({ href, title, image, width, height }) => (
          <Styled.PartnerLink
            key={title}
            href={href}
            image={image}
            width={width}
            height={height}
            target="_blank"
            rel="noreferrer noopener"
          />
        ))}
      </Styled.FooterContent>
    </Styled.Footer>
  );
};
