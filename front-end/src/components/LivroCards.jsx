import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaEye, FaBookmark, FaBookOpen, FaHourglassStart } from 'react-icons/fa6';

const LivroCards = ({ headline, livros }) => {
  const [favoritos, setFavoritos] = useState([]);
  const [lidos, setLidos] = useState([]);
  const [queroLer, setQueroLer] = useState([]);
  const [lendo, setLendo] = useState([]);

  useEffect(() => {
    const fetchStoredData = () => {
      setFavoritos(JSON.parse(localStorage.getItem('favoritos')) || []);
      setLidos(JSON.parse(localStorage.getItem('lidos')) || []);
      setQueroLer(JSON.parse(localStorage.getItem('queroLer')) || []);
      setLendo(JSON.parse(localStorage.getItem('lendo')) || []);
    };

    fetchStoredData();
  }, []);

  const updateLocalStorage = (type, list) => {
    localStorage.setItem(type, JSON.stringify(list));
  };

  const toggleFavorito = (id) => {
    const updatedFavoritos = favoritos.includes(id)
      ? favoritos.filter(fav => fav !== id)
      : [...favoritos, id];
    setFavoritos(updatedFavoritos);
    updateLocalStorage('favoritos', updatedFavoritos);
  };

  const toggleLido = (id) => {
    const updatedLidos = lidos.includes(id)
      ? lidos.filter(lid => lid !== id)
      : [...lidos, id];
    setLidos(updatedLidos);
    updateLocalStorage('lidos', updatedLidos);
  };

  const toggleQueroLer = (id) => {
    const updatedQueroLer = queroLer.includes(id)
      ? queroLer.filter(ql => ql !== id)
      : [...queroLer, id];
    setQueroLer(updatedQueroLer);
    updateLocalStorage('queroLer', updatedQueroLer);
  };

  const toggleLendo = (id) => {
    const updatedLendo = lendo.includes(id)
      ? lendo.filter(lid => lid !== id)
      : [...lendo, id];
    setLendo(updatedLendo);
    updateLocalStorage('lendo', updatedLendo);
  };

  return (
    <div className='my-16 px-4 lg:px-24'>
      <h2 className='text-2xl lg:text-4xl font-semibold tracking-wider text-left text-purple-900 mb-4 w-fit bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent'>
        {headline}
      </h2>

      <div className='mt-6'>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper w-full h-full"
        >
          {livros.map(livro => (
            <SwiperSlide key={livro._id}>
              <Link to={`/livro/${livro._id}`}>
                <div className='relative group'>
                  <img
                    src={livro.imagemURL}
                    alt={livro.tituloLivro}
                    className='w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105'
                  />
                </div>

                <div className='mt-2 text-center'>
                  <h3 className='text-lg font-medium text-gray-800 truncate'>{livro.tituloLivro}</h3>
                  <p className='text-sm text-gray-600'>{livro.nomeAutor}</p>
                  <p className='text-sm mb-12 text-blue-600 font-semibold'>{livro.nota ? livro.nota.toFixed(1) : 'Livro sem nota'}</p>
                </div>
              </Link>

              {/* Contêiner para os botões */}
              <div className='absolute top-3 right-1 flex flex-col items-center gap-2'>
                {/* Botões de ação */}
                <div 
                  className={`relative p-2 rounded cursor-pointer ${favoritos.includes(livro._id) ? 'bg-green-600' : 'bg-purple-700 hover:bg-purple-900'}`}
                  onClick={() => toggleFavorito(livro._id)}
                >
                  <FaBookmark className='w-4 h-4 text-white' />
                  <div className="tooltip">Adicionar aos favoritos</div>
                </div>

                <div 
                  className={`relative p-2 rounded cursor-pointer ${lidos.includes(livro._id) ? 'bg-green-600' : 'bg-purple-700 hover:bg-purple-900'}`}
                  onClick={() => toggleLido(livro._id)}
                >
                  <FaEye className='w-4 h-4 text-white' />
                  <div className="tooltip">Já li</div>
                </div>

                <div 
                  className={`relative p-2 rounded cursor-pointer ${queroLer.includes(livro._id) ? 'bg-green-600' : 'bg-purple-700 hover:bg-purple-900'}`}
                  onClick={() => toggleQueroLer(livro._id)}
                >
                  <FaBookOpen className='w-4 h-4 text-white' />
                  <div className="tooltip">Quero ler</div>
                </div>

                <div 
                  className={`relative p-2 rounded cursor-pointer ${lendo.includes(livro._id) ? 'bg-green-600' : 'bg-purple-700 hover:bg-purple-900'}`}
                  onClick={() => toggleLendo(livro._id)}
                >
                  <FaHourglassStart className='w-4 h-4 text-white' />
                  <div className="tooltip">Lendo</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .tooltip {
          visibility: hidden;
          background-color: rgba(125, 0, 246, 0.7); /* cor de fundo com transparência */
          color: #fff;
          text-align: center;
          border-radius: 5px;
            padding: 0px 10px;
             font-size: 12px;
          position: absolute;
          right: 110%; /* posicione o tooltip à esquerda do botão */
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .tooltip::after {
          content: " ";
          position: absolute;
          top: 50%;
          left: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.7); /* seta à direita do tooltip */
        }

        .relative:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default LivroCards;
