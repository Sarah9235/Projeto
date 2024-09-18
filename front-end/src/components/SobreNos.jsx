import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const SobreNos = () => {
  return (
    <div className="min-h-screen px-48 bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl mt-20 font-bold text-center mb-8">Sobre Nós</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Bem-vindo ao nosso site de resenhas literárias! Criado com muito empenho, este projeto tem como objetivo oferecer um espaço para você registrar suas leituras e compartilhar suas opiniões sobre livros de forma pessoal.
          </p>
          <p className="text-lg mb-4">
            Embora ainda esteja em desenvolvimento, estamos utilizando tecnologias modernas como React, Tailwind CSS e Swiper para proporcionar uma boa experiência. O projeto reflete a nossa dedicação e vontade de aprender e crescer.
          </p>
          <p className="text-lg mb-4">
            Estamos cientes de que há espaço para melhorias e, com o tempo, planejamos aprimorar ainda mais o site. Nossa meta é continuar evoluindo e oferecendo novas funcionalidades para tornar o site cada vez melhor.
          </p>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-6">Nossa Equipe</h2>
          <div className="flex flex-col items-center">
            <img src="foto.jpg" alt="Sarah Barcaro de Freitas" className="w-32 h-32 rounded-full mb-4" />
            <h3 className="text-lg font-semibold">Sarah Barcaro de Freitas</h3>
            <p className="text-sm text-gray-600">Desenvolvedora Júnior</p>
            <p className="text-sm text-gray-600 mt-4">
            Sou a desenvolvedora júnior responsável por este projeto. Estou dedicada a aprimorar continuamente o site e estou aberta a feedbacks para melhorar ainda mais.     </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNos;
