import React from 'react'
import BannerCard from '../home/BannerCard' 

const Banner = () => {
    return (
        <div className='px-4 lg:px-24 bg-purple-200 flex items-center'>

            <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>

                {/* Lado esquerdo do banner (texto) */}
                <div className='md:w=1/2 space-y-8 h-full'>

                    <h2 className='text-6xl md:w-3/5 font-bold leading-snug text-purple-950'>
                        Faça parte da nossa comunidade de leitores!
                    </h2>

                    <p className='md:w-3/5'>
                        Descubra novos livros, registre suas resenhas e crie um catálogo pessoal das suas leituras favoritas.
                        Compartilhe suas opiniões e mantenha sua paixão por livros sempre viva.
                        Junte-se a nós e transforme cada leitura em uma experiência memorável!
                    </p>

                </div>

                {/* Lado direito do banner */}

                <BannerCard />

            </div>
        </div>
    )
}

export default Banner
