import React, { useEffect, useState } from 'react';
import LivroCards from '../components/LivroCards'; // Componente que renderiza os livros no formato de carrossel

const Catalogo = () => {
  // Estados para armazenar os livros de diferentes categorias
  const [terror, setTerror] = useState([]);
  const [ficcao, setFiccao] = useState([]);
  const [romance, setRomance] = useState([]);
  const [distopia, setDistopia] = useState([]);
  const [aventura, setAventura] = useState([]);
  // const [comedia, setComedia] = useState([]);
  const [infantil, setInfantil] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa

  // useEffect executa o código dentro dele quando o componente é montado
  useEffect(() => {
    // Função assíncrona para buscar livros de uma categoria específica
    const fetchLivros = async (categoria, setCategoria) => {
      try {
        const response = await fetch(`http://localhost:5000/buscar-livros?categoria=${categoria}`);
        const data = await response.json(); // Convertendo a resposta para JSON
        setCategoria(data); // Atualizando o estado com os dados recebidos
      } catch (error) {
        console.error(`Erro ao buscar livros de ${categoria}:`, error); // Tratamento de erro
      }
    };

    // Chamando a função para buscar livros de diferentes categorias
    fetchLivros("Terror", setTerror);
    fetchLivros("Ficção", setFiccao);
    fetchLivros("Romance", setRomance);
    fetchLivros("Distopia", setDistopia);
    fetchLivros("Aventura", setAventura);
    // fetchLivros("Comédia", setComedia);
    fetchLivros("Infantil", setInfantil);
  }, []); // Array vazio indica que a função será chamada apenas uma vez ao montar o componente

  // Função para filtrar os livros com base no termo de pesquisa
  const filtroLivros = (livros) => {
    return livros.filter((livro) =>
      // Verifica se o termo de pesquisa está presente no título, descrição ou nome do autor
      (livro?.tituloLivro?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (livro?.descricao?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (livro?.nomeAutor?.toLowerCase().includes(searchTerm.toLowerCase())) // Filtro por autor
    );
  };

  return (
    <div className='px-4 lg:px-24 py-8 bg-gray-100'>
      {/* Título do catálogo */}
      <h1 className="text-4xl mt-20 font-extrabold text-center text-purple-900 p-4">
        Catálogo de Livros
      </h1>

      {/* Barra de pesquisa para filtrar livros */}
      <div className="text-center my-6">
        <input
          type="text"
          placeholder="Pesquise por título ou descrição..."
          value={searchTerm} // Ligação entre o input e o estado searchTerm
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa conforme o usuário digita
          className="px-6 py-3 w-1/2 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ease-in-out"
        />
      </div>

      <div className='mt-12'>
        {/* Exibindo livros de cada categoria, apenas se houverem livros na categoria correspondente */}
        
        {/* Carrossel de livros de Terror */}
        {terror.length > 0 && <LivroCards headline="Terror" livros={filtroLivros(terror)} />}

        {/* Carrossel de livros de Ficção */}
        {ficcao.length > 0 && <LivroCards headline="Ficção" livros={filtroLivros(ficcao)} />}

        {/* Carrossel de livros de Romance */}
        {romance.length > 0 && <LivroCards headline="Romance" livros={filtroLivros(romance)} />}

        {/* Carrossel de livros de Distopia */}
        {distopia.length > 0 && <LivroCards headline="Distopia" livros={filtroLivros(distopia)} />}

        {/* Carrossel de livros de Aventura */}
        {aventura.length > 0 && <LivroCards headline="Aventura" livros={filtroLivros(aventura)} />}

        {/* Carrossel de livros de Comédia
        {comedia.length > 0 && <LivroCards headline="Comédia" livros={filtroLivros(comedia)} />} */}

        {/* Carrossel de livros Infantis */}
        {infantil.length > 0 && <LivroCards headline="Infantil" livros={filtroLivros(infantil)} />}
      </div>
    </div>
  );
};

export default Catalogo;
