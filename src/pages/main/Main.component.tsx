import React from 'react';

import { FadeIn, Footer } from 'components';

import { Hero, Content } from './modules';

const Main = () => {
  return (
    <main>
      <FadeIn>
        <Hero />

        <Content />

        <Footer />
      </FadeIn>
    </main>
  );
};

export default Main;
