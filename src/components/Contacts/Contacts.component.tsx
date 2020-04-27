import React from 'react';

import Flex from 'ustudio-ui/components/Flex';

import FacebookIcon from '../../assets/icons/facebook.inline.svg';
import SlideshareIcon from '../../assets/icons/slideshare.inline.svg';
import YoutubeIcon from '../../assets/icons/youtube.inline.svg';
import TwitterIcon from '../../assets/icons/twitter.inline.svg';
import InstagramIcon from '../../assets/icons/instagram.inline.svg';

import Styled from './Contacts.styles';

export const Contacts = () => {
  return (
    <Flex margin={{ right: 'large' }}>
      <Styled.ContactLink href="https://www.facebook.com/prozorro.gov.ua" target="_blank">
        <FacebookIcon />
      </Styled.ContactLink>
      <Styled.ContactLink href="https://www.slideshare.net/ProZorro_slides" target="_blank">
        <SlideshareIcon />
      </Styled.ContactLink>
      <Styled.ContactLink href="https://www.youtube.com/channel/UCI-2twjrz8C4dYiQXDGZf5g" target="_blank">
        <YoutubeIcon />
      </Styled.ContactLink>
      <Styled.ContactLink href="https://twitter.com/the_prozorro" target="_blank">
        <TwitterIcon />
      </Styled.ContactLink>
      <Styled.ContactLink href="https://www.instagram.com/prozorro_team/" target="_blank">
        <InstagramIcon />
      </Styled.ContactLink>
    </Flex>
  );
};
