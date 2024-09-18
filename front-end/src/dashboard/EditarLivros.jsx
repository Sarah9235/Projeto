import React, { useState } from 'react'
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useLoaderData, useParams } from 'react-router-dom';


const EditarLivros = () => {

  const { id } = useParams();
  const { tituloLivro, nomeAutor, imagemURL, descricao } = useLoaderData();


  const categoriaLivros = [
    "Ficção", "Romance", "Aventura", "Terror", "Distopia", "Comédia", "Infantil"
  ];

  const [categoriaSelecionada, setcategoriaSelecionada] = useState(categoriaLivros[0]);

  const valorSelecionadoAlterado = (event) => {
    setcategoriaSelecionada(event.target.value);
  };

  // Função para lidar com o envio do livro
  const livroAtualizacao = (event) => {
    event.preventDefault();
    const form = event.target;

    const tituloLivro = form.tituloLivro.value;
    const nomeAutor = form.nomeAutor.value;
    const imagemURL = form.imagemURL.value;
    const categoria = form.categoria.value;
    const descricao = form.descricao.value;

    const atualizarLivroObj = {
      tituloLivro,
      nomeAutor,
      imagemURL,
      categoria,
      descricao
    };

    // Atualizar dados do livro
    fetch(`http://localhost:5000/livro/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(atualizarLivroObj)  // Use o nome correto do objeto
    })
      .then(res => res.json())
      .then(dados => {
        alert("Livro atualizado com sucesso!!");
      })
      .catch(error => {
        console.error("Erro ao atualizar o livro:", error);
      });


  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>
        Editar dados do livro
      </h2>

      <form onSubmit={livroAtualizacao} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* 1ª Linha */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="tituloLivro" value="Titulo do Livro" />
            </div>
            <TextInput
              id="tituloLivro"
              name="tituloLivro"
              type="text"
              placeholder="Titulo do Livro"
              required
              defaultValue={tituloLivro}
            />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="nomeAutor" value="Nome do autor" />
            </div>
            <TextInput
              id="nomeAutor"
              name="nomeAutor"
              type="text"
              placeholder="Nome do autor"
              required
              defaultValue={nomeAutor}
            />
          </div>
        </div>

        {/* 2ª Linha */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imagemURL" value="Imagem do livro (URL)" />
            </div>
            <TextInput
              id="imagemURL"
              name="imagemURL"
              type="text"
              placeholder="Imagem do livro (URL)"
              required
              defaultValue={imagemURL}
            />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Categoria" />
            </div>
            <Select
              id='inputState'
              name='categoria'
              className='w-full rounded'
              value={categoriaSelecionada}
              onChange={valorSelecionadoAlterado}
            >
              {categoriaLivros.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Descrição do Livro */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="descricao" value="Descrição do Livro" />
          </div>
          <Textarea
            id="descricao"
            name="descricao"
            placeholder="Insira a descrição do livro..."
            required
            rows={6}
            defaultValue={descricao}
          />
        </div>

        <Button type="submit" className='mt-5 bg-purple-800'>
          Atualizar o livro
        </Button>
      </form>
    </div>
  );
}

export default EditarLivros
