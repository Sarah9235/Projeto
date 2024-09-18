import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './BannerCard.css';

// Importando módulos dos cards e autoplay
import { EffectCards, Autoplay } from 'swiper/modules';

// Importando imagens diretamente
import livro1 from '../assets/banner-books/livro1.jpg';
import livro2 from '../assets/banner-books/livro2.jpg';
import livro3 from '../assets/banner-books/livro3.jpg';
import livro4 from '../assets/banner-books/livro4.jpg';
import livro5 from '../assets/banner-books/livro5.jpg';
import livro6 from '../assets/banner-books/livro6.jpg';
import livro7 from '../assets/banner-books/livro7.jpg';

const BannerCard = () => {
  return (
    <div className='banner mr-40'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Autoplay]} // Adiciona o Autoplay
        className="mySwiper "
        autoplay={{
          delay: 1100, // Tempo em milissegundos para cada slide
          disableOnInteraction: false, // Continua passando mesmo após interação
        }}
        loop={true} // Faz com que o carrossel repita os slides após o último
      >
        <SwiperSlide>
          <img src={livro1} alt="Livro 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={livro2} alt="Livro 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={livro3} alt="Livro 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={livro4} alt="Livro 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={livro5} alt="Livro 5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={livro6} alt="Livro 6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={livro7} alt="Livro 7" />
        </SwiperSlide>
   
      </Swiper>
    </div>
  );
};

export default BannerCard;
