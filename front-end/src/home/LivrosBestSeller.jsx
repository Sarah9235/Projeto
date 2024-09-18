import React, { useEffect, useState } from 'react';
import LivroCards from '../components/LivroCards';


const LivrosBestSeller = () => {
    const [livros, setLivros] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/buscar-livros").then(res => res.json()).then(dados => setLivros(dados.slice(0, 10)))
    }, [])

    return (
        <div className=''>
            
            <LivroCards livros={livros} headline="Livros Best Seller" />
        </div>
    )
}

export default LivrosBestSeller
