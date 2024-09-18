import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './BannerCard.css';

// Importando módulo dos cards e autoplay
import { EffectCards, Autoplay } from 'swiper/modules';

const BannerCard = () => {
  return (
    <div className='banner mr-40'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Autoplay]} // Adiciona o Autoplay
        className="mySwiper"
        autoplay={{
          delay: 1300, // Tempo em milissegundos para cada slide
          disableOnInteraction: false, // Continua passando mesmo após interação
        }}
        loop={true} // Faz com que o carrossel repita os slides após o último
      >
        <SwiperSlide>
          <img src="./src/assets/banner-books/livro1.jpg" alt="Livro 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/banner-books/livro2.jpg" alt="Livro 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/banner-books/livro3.jpg" alt="Livro 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/banner-books/livro4.jpg" alt="Livro 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/banner-books/livro5.jpg" alt="Livro 5" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCard;
