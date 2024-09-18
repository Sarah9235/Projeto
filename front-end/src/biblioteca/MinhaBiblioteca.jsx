import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação

const MinhaBiblioteca = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch('http://localhost:5000/buscar-livros');
        if (!response.ok) throw new Error('Erro ao buscar livros');
        const data = await response.json();
        setLivros(data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

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

  if (loading) return <p className="text-center text-gray-500">Carregando...</p>;

  if (error) return <p className="text-center text-red-500">Erro: {error}</p>;

  const livrosFiltrados = livros.filter(livro => {
    switch (filtro) {
      case 'favoritos':
        return favoritos.includes(livro._id);
      case 'lidos':
        return lidos.includes(livro._id);
      case 'queroLer':
        return queroLer.includes(livro._id);
      case 'lendo':
        return lendo.includes(livro._id);
      default:
        return favoritos.includes(livro._id) || lidos.includes(livro._id) || queroLer.includes(livro._id) || lendo.includes(livro._id);
    }
  });

  const getStatus = (livroId) => {
    if (lidos.includes(livroId)) return 'Lido';
    if (lendo.includes(livroId)) return 'Lendo';
    if (queroLer.includes(livroId)) return 'Quero Ler';
    if (favoritos.includes(livroId)) return 'Favorito';
    return 'Sem status';
  };

  const handleLivroClick = (id) => {
    navigate(`/livro/${id}`); // Redireciona para a página do livro com o id
  };

  const renderLivros = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {livrosFiltrados.map(livro => (
        <div 
          key={livro._id} 
          className="p-4 border bg-white rounded-lg shadow-md cursor-pointer"
          onClick={() => handleLivroClick(livro._id)} // Adiciona evento de clique
        >
          <img src={livro.imagemURL} alt={livro.tituloLivro} className="w-full h-48 object-cover mb-2 rounded-md" />
          <h3 className="text-lg font-semibold">{livro.tituloLivro}</h3>
          <p className="text-gray-600">{livro.nomeAutor}</p>
          <p className="text-blue-600 font-semibold">{livro.nota ? livro.nota.toFixed(1) : 'Sem nota'}</p>
          <p className="text-green-600 font-medium mt-1">{getStatus(livro._id)}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="py-16 px-4 lg:px-24">
      <h2 className="text-2xl mt-8 lg:text-4xl font-semibold tracking-wider text-left text-purple-900 mb-4 w-fit bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
        Minha Biblioteca
      </h2>

      <div className="mb-4">
        <label htmlFor="filtro" className="block text-sm font-medium text-gray-700">Filtrar por:</label>
        <select
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="todos">Todos</option>
          <option value="favoritos">Favoritos</option>
          <option value="lidos">Lidos</option>
          <option value="queroLer">Quero Ler</option>
          <option value="lendo">Lendo</option>
        </select>
      </div>

      {renderLivros()}
    </div>
  );
};

export default MinhaBiblioteca;
