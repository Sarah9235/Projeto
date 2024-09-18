import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

const ControleLivros = () => {

  const [buscarLivros, setbuscarLivros] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/buscar-livros")
      .then(res => res.json())
      .then(dados => setbuscarLivros(dados));
  }, [])


  // Excluir um livro
  const lidarComExclusao = (id) => {
    // Exibe a caixa de confirmação
    const confirmacao = window.confirm('Você tem certeza que deseja excluir este livro?');
  
    // Se o usuário clicar em "Cancelar", não faz nada
    if (!confirmacao) return;
  
    // Se o usuário confirmar, faz a requisição para excluir o livro
    fetch(`http://localhost:5000/livro/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(dados => {
        alert('Livro deletado com sucesso!');
        // Atualiza a lista de livros após a exclusão
        setbuscarLivros(buscarLivros.filter(livro => livro._id !== id));
      })
      .catch(error => {
        alert('Erro ao deletar o livro. Tente novamente.');
        console.error('Erro ao deletar o livro:', error);
      });
  };
  
  return (
    <div className="relative px-4 my-12">
      <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black"></div>

      <h2 className="mb-8 text-3xl font-bold">
        Controle seus livros
      </h2>

      {/* Tabela para os dados dos livros: */}

      <Table className="relative z-10 lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>Nº</Table.HeadCell>
          <Table.HeadCell>Nome do livro</Table.HeadCell>
          <Table.HeadCell>Nome do autor</Table.HeadCell>
          <Table.HeadCell>Categoria</Table.HeadCell>
          <Table.HeadCell>
            <span>Editar / Excluir</span>
          </Table.HeadCell>
        </Table.Head>
        {
          buscarLivros.map((livro, index) => <Table.Body className="divide-y" key={livro._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {livro.tituloLivro}
              </Table.Cell>
              <Table.Cell>
                {livro.nomeAutor}
              </Table.Cell>
              <Table.Cell>
                {livro.categoria}
              </Table.Cell>
              <Table.Cell>
                <Link href="#" className="font-medium text-purple-900 hover:underline mr-5"
                  to={`/admin/dashboard/editLivros/${livro._id}`}
                >
                  Editar
                </Link>
                <button onClick={() => lidarComExclusao(livro._id)} className='bg-pink-900 px-4 py-1 font-semibold text-white rounded-lg 
              hover:bg-purple-900'>
                  Excluir
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>)
        }

      </Table>
    </div >

  )
}

export default ControleLivros
