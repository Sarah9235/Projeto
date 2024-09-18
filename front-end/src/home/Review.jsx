import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// React Icons
import { FaStar } from "react-icons/fa6"
import { Avatar } from "flowbite-react";
import perfil from "../assets/perfil.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';



const Review = () => {
    return (
        <div className='mt-12  mb-8 px-4 lg:px-24'>
            <h2 className='text-5xl font-bold text-center mb-10 leading-snug text-purple-900'>Minhas resenhas</h2>

            <div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='shadow-2xl bg:white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>

                            {/* texto */}
                            <div className='mt-7'>
                                <p className='mb-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iure
                                    repellat pariatur, nobis reprehenderit porro quasi. Provident,
                                    facere reiciendis maiores, autem incidunt quod!</p>
                                <Avatar img={perfil} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>25/09/2024</h5>
                                <p className='text-base'>Nome do Livro</p>

                            </div>

                        </div>
                    </SwiperSlide>
              
                     <SwiperSlide className='shadow-2xl bg:white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                           
                            </div>

                            {/* texto */}
                            <div className='mt-7'>
                                <p className='mb-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iure
                                    repellat pariatur, nobis reprehenderit porro quasi. Provident,
                                    facere reiciendis maiores, autem incidunt quod!</p>
                                <Avatar img={perfil} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>05/09/2024</h5>
                                <p className='text-base'>Nome do Livro</p>

                            </div>

                        </div>
                    </SwiperSlide>

                     <SwiperSlide className='shadow-2xl bg:white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>

                            {/* texto */}
                            <div className='mt-7'>
                                <p className='mb-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iure
                                    repellat pariatur, nobis reprehenderit porro quasi. Provident,
                                    facere reiciendis maiores, autem incidunt quod!</p>
                                <Avatar img={perfil} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>19/08/2024</h5>
                                <p className='text-base'>Nome do Livro</p>

                            </div>

                        </div>
                    </SwiperSlide>

                     <SwiperSlide className='shadow-2xl bg:white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                              
                            </div>

                            {/* texto */}
                            <div className='mt-7'>
                                <p className='mb-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iure
                                    repellat pariatur, nobis reprehenderit porro quasi. Provident,
                                    facere reiciendis maiores, autem incidunt quod!</p>
                                <Avatar img={perfil} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>06/08/2024</h5>
                                <p className='text-base'>Nome do Livro</p>

                            </div>

                        </div>
                    </SwiperSlide>

                     <SwiperSlide className='shadow-2xl bg:white py-8 px-4 md:m-5 rounded-lg border'>
                        <div className='space-y-6'>
                            <div className='text-amber-500 flex gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>

                            {/* texto */}
                            <div className='mt-7'>
                                <p className='mb-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore iure
                                    repellat pariatur, nobis reprehenderit porro quasi. Provident,
                                    facere reiciendis maiores, autem incidunt quod!</p>
                                <Avatar img={perfil} alt="avatar of Jese" rounded className='w-10 mb-4' />
                                <h5 className='text-lg font-medium'>28/07/2024</h5>
                                <p className='text-base'>Nome do Livro</p>

                            </div>

                        </div>
                    </SwiperSlide>
                </Swiper>

            </div>


        </div>
    )
}

export default Review
