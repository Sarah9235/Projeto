import React from 'react'
import FavLivroImg from "../assets/livros.png"
import { Link } from 'react-router-dom'


const FavLivro = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex bg-purple-200 flex-col md:flex-row justify-between items-center gap-12'>
      <div className='md:w-1/2'>
        <img src={FavLivroImg} alt="" className='rounded md:w-10/12' />
      </div>

      <div className='md:w-1/2 space-y-6'>
        <h2 className='text-5xl font-bold my-5 md:w-3/4 leading-snug'>Encontre sua
          <span className='text-purple-800'> próxima leitura</span> aqui!  </h2>
        <p className='mb-10 text-lg md:w-5/6'>Descubra uma seleção de livros que prometem capturar sua imaginação e transformar suas tardes. Seja você um amante de romances envolventes, mistérios intrigantes ou não-ficção reveladora, nossa coleção tem algo especial para você. De histórias que aquecem o coração a aventuras que desafiam a mente, cada título é uma nova oportunidade de explorar, sonhar e se encantar. Navegue por nossa curadoria e encontre o livro que vai ser seu próximo companheiro de leitura.</p>
    
     {/* ir pro catalogo */}
     <Link to="/catalogo" className='mt-12 block'><button className='bg-purple-700 text-white font-semibold px-5 py-3 rounded
     hover:bg-purple-950 transition-all duration-300'>Explorar livros</button></Link>

      
        <div>
          <div>
            {/* <h3>--------</h3> */}
          </div>
        </div>

      </div>

    </div>
  )
}

export default FavLivro
