import React from 'react';

import Styled from './Footer.styles';

import prozorroLogo from '../../assets/images/partners/prozorro.png';
import meGovLogo from '../../assets/images/partners/me-gov.png';
import tiUkraineLogo from '../../assets/images/partners/transparency-ua.png';
import openContractingLogo from '../../assets/images/partners/open-contracting.png';
import ebrdLogo from '../../assets/images/partners/ebrd.png';
import icfLogo from '../../assets/images/partners/icf.png';
import cpbLogo from '../../assets/images/partners/cpb.png';
import ustudioLogo from '../../assets/images/partners/ustudio.png';

export const Footer = () => {
  const partners = [
    {
      title: 'prozorro',
      image: prozorroLogo,
      href: 'https://prozorro.gov.ua/en',
    },
    {
      title: 'me-gov',
      image: meGovLogo,
      href: 'https://www.me.gov.ua',
    },
    {
      title: 'cpb',
      image: cpbLogo,
      href: 'https://cpb.org.ua',
    },
    {
      title: 'ti-ukraine',
      image: tiUkraineLogo,
      href: 'https://ti-ukraine.org',
    },
    {
      title: 'open-contracting',
      image: openContractingLogo,
      href: 'https://open-contracting.org',
    },
    {
      title: 'ustudio',
      image: ustudioLogo,
      href: 'https://ustudio.company',
    },
    {
      title: 'ebrd',
      image: ebrdLogo,
      href: 'https://ebrd.com',
    },
    {
      title: 'icf',
      image: icfLogo,
      href: 'https://icf.com',
    },
  ];
  return (
    <Styled.Footer>
      <Styled.FooterContent alignment={{ vertical: 'center' }}>
        {partners.map(({ href, title, image }) => (
          <Styled.PartnerLink key={title} href={href} image={image} target="_blank" rel="noreferrer noopener" />
        ))}
      </Styled.FooterContent>
    </Styled.Footer>
  );
};
