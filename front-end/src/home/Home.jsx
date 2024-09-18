import React from 'react'
import Banner from '../components/Banner'
import LivrosBestSeller from './LivrosBestSeller'
import FavLivro from './favLivro'
import Recomendados from './Recomendados'
import Review from './Review'
import Parceria from './Parceria'

const Home = () => {
  return (
 <div>
  <Banner/>
  <Parceria/>
  <LivrosBestSeller/>
  <FavLivro/>
  <Recomendados/>
  <Review/>
 </div>
  )
}

export default Home
