import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ResenhaLivro = () => {
  const { tituloLivro, imagemURL, _id, descricao, nota } = useLoaderData();
  const [notaLivro, setNotaLivro] = useState(nota || 0);
  const [erro, setErro] = useState(null);
  const [resenhas, setResenhas] = useState([]);
  const [novoTexto, setNovoTexto] = useState('');
  const [resenhaEditada, setResenhaEditada] = useState(null);

  useEffect(() => {
    const carregarResenhas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/livro/${_id}/resenhas`);
        if (!response.ok) throw new Error('');
        const data = await response.json();
        setResenhas(data);
      } catch (error) {
        setErro(error.message || '');
      }
    };

    carregarResenhas();
  }, [_id]);

  const atualizarNota = async (novaNota) => {
    try {
      const response = await fetch(`http://localhost:5000/livro/${_id}/nota`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nota: novaNota }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar a nota do livro.');
      const data = await response.json();
      setNotaLivro(data.nota);
    } catch (error) {
      setErro(error.message || 'Erro ao atualizar a nota do livro.');
    }
  };

  const adicionarResenha = async () => {
    try {
      const response = await fetch(`http://localhost:5000/livro/${_id}/resenha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: novoTexto }),
      });

      if (!response.ok) throw new Error('Erro ao adicionar a resenha.');
      const novaResenha = await response.json();
      setResenhas([...resenhas, novaResenha]);
      setNovoTexto('');
    } catch (error) {
      setErro(error.message || 'Erro ao adicionar a resenha.');
    }
  };

  const deletarResenha = async (resenhaId) => {
    // Exibe a caixa de confirmação
    const confirmacao = window.confirm('Você tem certeza que deseja excluir esta resenha?');
    
    // Se o usuário clicar em "Cancelar", não faz nada
    if (!confirmacao) return;
    
    try {
      const response = await fetch(`http://localhost:5000/livro/${_id}/resenha/${resenhaId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error('Erro ao excluir a resenha.');
      setResenhas(resenhas.filter(resenha => resenha._id !== resenhaId));
    } catch (error) {
      setErro(error.message || 'Erro ao excluir a resenha.');
    }
  };
  

  const editarResenha = async () => {
    if (resenhaEditada) {
      try {
        const response = await fetch(`http://localhost:5000/livro/${_id}/resenha/${resenhaEditada._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ texto: novoTexto }),
        });

        if (!response.ok) throw new Error('Erro ao editar a resenha.');
        setResenhas(resenhas.map(resenha =>
          resenha._id === resenhaEditada._id
            ? { ...resenha, texto: novoTexto }
            : resenha
        ));
        setNovoTexto('');
        setResenhaEditada(null);
      } catch (error) {
        setErro(error.message || 'Erro ao editar a resenha.');
      }
    }
  };

  // Função para formatar a data com verificação
  const formatarData = (dataString) => {
    if (!dataString) return 'Data não disponível';

    // Tenta criar um objeto Date a partir da string
    const date = new Date(dataString);

    // Verifica se a data é válida
    if (isNaN(date.getTime())) return 'Data inválida';

    // Formata a data no formato "dd/MM/yyyy HH:mm"
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="py-32 bg-gray-100 px-4 lg:px-24 flex flex-col items-center">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 w-full lg:w-3/4 bg-white rounded-lg shadow-xl p-6 border-t border-gray-100">
        <img src={imagemURL} alt={tituloLivro} className="w-full lg:w-1/3 object-cover rounded-lg" />
        <div className="lg:w-2/3 mt-6 lg:mt-0">
          <h2 className="text-4xl font-bold text-purple-700 mb-4">{tituloLivro}</h2>
          <p className="text-gray-700 mb-6">{descricao}</p>

          <div className="flex items-center space-x-2">
            <span className="text-purple-700 font-semibold">Nota:</span>
            <ReactStars
              count={5}
              size={24}
              value={notaLivro}
              isHalf={true}
              onChange={atualizarNota}
              activeColor="#ffd700"
            />
            {erro && <p className="text-red-500">{erro}</p>}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-3/4 mt-8">
        <h3 className="text-2xl font-bold text-purple-700 mb-4">Resenhas</h3>
        {resenhas.length > 0 ? (
          <ul>
            {resenhas.map(resenha => (
              <li key={resenha._id} className="mb-4 p-4 border bg-white rounded-lg shadow-md">
                <p className="mb-4">{resenha.texto}</p>
                <p className="mb-1 text-gray-600">{formatarData(resenha.data)}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setNovoTexto(resenha.texto);
                      setResenhaEditada(resenha);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarResenha(resenha._id)}
                    className="text-red-500 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>

        ) : (
          <p>Nenhuma resenha encontrada para este livro.</p>
        )}

        <div className="mt-8 p-4 border rounded-lg bg-white shadow-md">
          <h4 className="text-xl font-bold text-purple-700 mb-4">{resenhaEditada ? 'Editar Resenha' : 'Adicionar Resenha'}</h4>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Texto:</label>
            <textarea
              value={novoTexto}
              onChange={(e) => setNovoTexto(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            onClick={resenhaEditada ? editarResenha : adicionarResenha}
            className="bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            {resenhaEditada ? 'Atualizar Resenha' : 'Adicionar Resenha'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResenhaLivro;
