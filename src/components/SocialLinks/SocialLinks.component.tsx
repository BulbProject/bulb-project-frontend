import React from 'react';

import Flex from 'ustudio-ui/components/Flex';

import FacebookIcon from '../../assets/icons/facebook.inline.svg';
import SlideshareIcon from '../../assets/icons/slideshare.inline.svg';
import YoutubeIcon from '../../assets/icons/youtube.inline.svg';
import TwitterIcon from '../../assets/icons/twitter.inline.svg';
import InstagramIcon from '../../assets/icons/instagram.inline.svg';

import Styled from './SocialLinks.styles';

export const SocialLinks = () => {
  return (
    <Flex isInline>
      <Styled.SocialLink href="https://www.facebook.com/prozorro.gov.ua" target="_blank" rel="noreferrer noopener">
        <FacebookIcon />
      </Styled.SocialLink>
      <Styled.SocialLink href="https://www.slideshare.net/ProZorro_slides" target="_blank" rel="noreferrer noopener">
        <SlideshareIcon />
      </Styled.SocialLink>
      <Styled.SocialLink
        href="https://www.youtube.com/channel/UCI-2twjrz8C4dYiQXDGZf5g"
        target="_blank"
        rel="noreferrer noopener"
      >
        <YoutubeIcon />
      </Styled.SocialLink>
      <Styled.SocialLink href="https://twitter.com/the_prozorro" target="_blank" rel="noreferrer noopener">
        <TwitterIcon />
      </Styled.SocialLink>
      <Styled.SocialLink href="https://www.instagram.com/prozorro_team/" target="_blank" rel="noreferrer noopener">
        <InstagramIcon />
      </Styled.SocialLink>
    </Flex>
  );
};
