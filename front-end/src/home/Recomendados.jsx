import React, { useEffect, useState } from 'react'
import LivroCards from '../components/LivroCards';

const Recomendados = () => {
    const [livros, setLivros] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/buscar-livros").then(res => res.json()).then(dados => setLivros(dados.slice(5, 20)))
    }, [])

    return (
        <div>
            <LivroCards livros={livros} headline="Livros Recomendados" />
        </div>
    )
}

export default Recomendados
