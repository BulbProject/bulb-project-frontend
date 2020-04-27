import React from 'react';

import Flex from 'ustudio-ui/components/Flex';

import FacebookIcon from '../../assets/icons/facebook.inline.svg';
import SlideshareIcon from '../../assets/icons/slideshare.inline.svg';
import YoutubeIcon from '../../assets/icons/youtube.inline.svg';
import TwitterIcon from '../../assets/icons/twitter.inline.svg';
import InstagramIcon from '../../assets/icons/instagram.inline.svg';

import Styled from './SocialLinks.styles';

export const SocialLinks = () => {
  const links = [
    {
      title: 'facebook',
      href: 'https://www.facebook.com/prozorro.gov.ua',
      icon: <FacebookIcon />,
      color: '#3b5998',
    },
    {
      title: 'slideshare',
      href: 'https://www.slideshare.net/ProZorro_slides',
      icon: <SlideshareIcon />,
      color: '#067ab6',
    },
    {
      title: 'youtube',
      href: 'https://www.youtube.com/channel/UCI-2twjrz8C4dYiQXDGZf5g',
      icon: <YoutubeIcon />,
      color: '#e62117',
    },
    {
      title: 'twitter',
      href: 'https://twitter.com/the_prozorro',
      icon: <TwitterIcon />,
      color: '#00aced',
    },
    {
      title: 'instagram',
      href: 'https://www.instagram.com/prozorro_team/',
      icon: <InstagramIcon />,
      color: '#bc2a8d',
    },
  ];

  return (
    <Flex isInline>
      {links.map((link) => (
        <Styled.SocialLink
          key={link.title}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          color={link.color}
        >
          {link.icon}
        </Styled.SocialLink>
      ))}
    </Flex>
  );
};
