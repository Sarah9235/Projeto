import React from 'react';
import Banner from '../components/Banner';
import LivrosBestSeller from './LivrosBestSeller';
import FavLivro from './FavLivro';
import Recomendados from './Recomendados';
import Review from './Review';
import Parceria from './Parceria';

const Home = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 lg:flex-row lg:flex-wrap lg:gap-8 lg:p-8">
      <Banner className="w-full" />
      <Parceria className="w-full" />
      <LivrosBestSeller className="w-full" />
      <FavLivro className="w-full" />
      <Recomendados className="w-full" />
      <Review className="w-full" />
    </div>
  );
};

export default Home;
