import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Cell from 'ustudio-ui/components/Grid/Cell';
import Grid from 'ustudio-ui/components/Grid/Grid';
import Flex from 'ustudio-ui/components/Flex';

import Styled from './footer.styles';

import ProzorroLogo from '../../../assets/images/partners/i-prozorro.png';
import MeGovLogo from '../../../assets/images/partners/i-me.png';
import TiUkraineLogo from '../../../assets/images/partners/i-ti.png';
import OpenContractingLogo from '../../../assets/images/partners/i-ocp.png';
import EbrdLogo from '../../../assets/images/partners/i-ebrd.png';
import IcfLogo from '../../../assets/images/partners/i-ifc.png';
import UstudioLogo from '../../../assets/images/partners/i-us.png';

export const Footer = memo(() => {
  const partners = useMemo(
    () => [
      {
        title: 'prozorro',
        image: ProzorroLogo,
        href: 'https://prozorro.gov.ua/en',
        width: 8,
      },
      {
        title: 'ti-ukraine',
        image: TiUkraineLogo,
        href: 'https://ti-ukraine.org',
        width: 7,
      },
      {
        title: 'ebrd',
        image: EbrdLogo,
        href: 'https://ebrd.com',
        width: 10,
      },
      {
        title: 'me-gov',
        image: MeGovLogo,
        href: 'https://www.me.gov.ua',
        width: 10,
      },
      {
        title: 'icf',
        image: IcfLogo,
        href: 'https://icf.com',
        width: 4,
      },

      {
        title: 'open-contracting',
        image: OpenContractingLogo,
        href: 'https://open-contracting.org',
        width: 6,
      },
    ],
    []
  );

  const { t } = useTranslation('common');

  return (
    <Styled.Footer as="footer">
      <Grid>
        <Cell xl={{ offset: { before: 1 }, size: 8 }}>
          <Styled.FooterContent alignment={{ vertical: 'center' }}>
            {partners.map((props) => (
              <Styled.PartnerLink key={props.title} {...props} target="_blank" rel="noreferrer noopener" />
            ))}
          </Styled.FooterContent>
        </Cell>

        <Cell xl={{ offset: { before: 1, after: 1 }, size: 1 }}>
          <Flex alignment={{ vertical: 'end', horizontal: 'center' }} margin={{ bottom: 'regular', top: 'regular' }}>
            <Styled.TextWrapper direction="column" alignment={{ vertical: 'center' }}>
              <Styled.CopyrightText>{t('designed-by')}</Styled.CopyrightText>
              <Styled.CopyrightText>Ustudio&nbsp;Company</Styled.CopyrightText>{' '}
            </Styled.TextWrapper>

            <Styled.CopyrightLogoLink
              image={UstudioLogo}
              href="https://ustudio.company"
              target="_blank"
              rel="noreferrer noopener"
            />
          </Flex>
        </Cell>
      </Grid>
    </Styled.Footer>
  );
});
