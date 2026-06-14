import type { FC } from 'react';
import Hero from '../components/sections/Hero';
import Philosophy from '../components/sections/Philosophy';

export const Home: FC = () => {
  return (
    <main>
      <Hero />
      <Philosophy />
    </main>
  );
};

export default Home;
