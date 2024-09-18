const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// Middleware
app.use(cors()); // Habilita CORS para permitir requisições de outros domínios
app.use(express.json()); // Habilita o processamento de requisições JSON

// Configuração do MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://sarahbfreitas18:03vF8EFIfru45NWv@cluster0.85whp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Criação do cliente MongoDB com configurações da API estável
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Conecta ao MongoDB
    await client.connect();

    // Referências às coleções do MongoDB
    const colecaoLivros = client.db("Projeto").collection("livros");
    const colecaoResenhas = client.db("Projeto").collection("resenhas");

    // Adicionar um livro: POST
    app.post("/upload-livro", async (req, res) => {
      const dados = req.body; // Dados do livro recebidos no corpo da requisição
      const result = await colecaoLivros.insertOne(dados); // Insere o livro na coleção
      res.send(result); // Retorna o resultado da operação
    });

    // Atualizar um livro: PATCH
    app.patch("/livro/:id", async (req, res) => {
      const id = req.params.id; // ID do livro a ser atualizado
      const atualizarDadosLivro = req.body; // Dados a serem atualizados
      const filter = { _id: new ObjectId(id) }; // Filtro para localizar o livro
      const atualizarDoc = { $set: atualizarDadosLivro }; // Dados atualizados
      const options = { upsert: true }; // Cria o documento se não existir
      const result = await colecaoLivros.updateOne(filter, atualizarDoc, options);
      res.send(result);
    });

    // Atualizar a nota de um livro: PATCH
    app.patch("/livro/:id/nota", async (req, res) => {
      const id = req.params.id; // ID do livro
      const { nota } = req.body; // Nota a ser atualizada
      const filter = { _id: new ObjectId(id) }; // Filtro para localizar o livro
      const atualizarDoc = { $set: { nota } }; // Dados atualizados
      const options = { upsert: true };
      const result = await colecaoLivros.updateOne(filter, atualizarDoc, options);
      res.send(result);
    });

    // Deletar um livro: DELETE
    app.delete("/livro/:id", async (req, res) => {
      const id = req.params.id; // ID do livro a ser deletado
      const filter = { _id: new ObjectId(id) }; // Filtro para localizar o livro
      const result = await colecaoLivros.deleteOne(filter);
      res.send(result);
    });

    // Buscar livros por categoria: GET
    app.get("/buscar-livros", async (req, res) => {
      let query = {};
      if (req.query?.categoria) {
        query = { categoria: req.query.categoria }; // Filtro por categoria
      }
      const result = await colecaoLivros.find(query).toArray();
      res.send(result);
    });

    // Receber dados de um único livro: GET
    app.get("/livro/:id", async (req, res) => {
      const id = req.params.id;
      try {
          const filter = { _id: new ObjectId(id) };
          const result = await colecaoLivros.findOne(filter);
          if (!result) {
              return res.status(404).send({ error: 'Livro não encontrado' });
          }
          res.json(result); // Certifique-se de que está retornando JSON
      } catch (error) {
          console.error('Erro ao buscar livro:', error);
          res.status(500).send({ error: 'Erro interno do servidor' });
      }
  });
  





    // *** Resenhas ***

    // Adicionar uma resenha para um livro: POST
    app.post("/livro/:id/resenha", async (req, res) => {
      const livroId = req.params.id; // ID do livro para o qual a resenha será adicionada
      const { texto } = req.body; // Dados da resenha
      try {
        const livro = await colecaoLivros.findOne({ _id: new ObjectId(livroId) }); // Busca o livro para obter o título
        if (!livro) {
          return res.status(404).send({ message: "Livro não encontrado" });
        }
        const novaResenha = {
          livroId: new ObjectId(livroId),
          tituloLivro: livro.tituloLivro, // Adiciona o título do livro à resenha
          texto: texto,
          data: new Date() // Data da resenha
        };
        const result = await colecaoResenhas.insertOne(novaResenha); // Insere a resenha
        await colecaoLivros.updateOne(
          { _id: new ObjectId(livroId) },
          { $push: { resenhas: result.insertedId } } // Adiciona a referência da resenha ao livro
        );
        res.send(result);
      } catch (error) {
        console.error("Erro ao adicionar resenha:", error);
        res.status(500).send({ message: "Erro ao adicionar resenha" });
      }
    });

    // Buscar todas as resenhas de um livro: GET
    app.get("/livro/:id/resenhas", async (req, res) => {
      const livroId = req.params.id; // ID do livro
      try {
        const resenhas = await colecaoResenhas.find({ livroId: new ObjectId(livroId) }).toArray(); // Busca todas as resenhas para o livro
        if (!resenhas.length) {
          return res.status(404).send({ message: "Nenhuma resenha encontrada para este livro." });
        }
        res.send(resenhas);
      } catch (error) {
        console.error("Erro ao buscar resenhas:", error);
        res.status(500).send({ message: "Erro ao buscar resenhas" });
      }
    });

    // Buscar todas as resenhas com detalhes do livro: GET
    app.get("/resenhas", async (req, res) => {
      try {
        const resenhas = await colecaoResenhas.find().toArray(); // Busca todas as resenhas
        const livroIds = resenhas.map(resenha => resenha.livroId); // Coleta todos os IDs dos livros relacionados às resenhas
        const livros = await colecaoLivros.find({ _id: { $in: livroIds } }).toArray(); // Busca todos os livros
        const livrosMap = livros.reduce((acc, livro) => {
          acc[livro._id.toString()] = livro;
          return acc;
        }, {});
        const resenhasComLivros = resenhas.map(resenha => ({
          ...resenha,
          livro: livrosMap[resenha.livroId.toString()] || null // Adiciona o livro associado à resenha
        }));
        res.json(resenhasComLivros);
      } catch (error) {
        console.error("Erro ao buscar resenhas:", error);
        res.status(500).json({ message: "Erro ao buscar resenhas" });
      }
    });

    // Deletar uma resenha: DELETE
    app.delete("/livro/:id/resenha/:resenhaId", async (req, res) => {
      const { resenhaId } = req.params; // ID da resenha
      const filter = { _id: new ObjectId(resenhaId) }; // Filtro para localizar a resenha
      try {
        const result = await colecaoResenhas.deleteOne(filter);
        if (result.deletedCount === 1) {
          res.status(200).send({ message: 'Resenha excluída com sucesso' });
        } else {
          res.status(404).send({ message: 'Resenha não encontrada' });
        }
      } catch (error) {
        console.error("Erro ao excluir resenha:", error);
        res.status(500).send({ message: 'Erro ao excluir resenha' });
      }
    });

    // Atualizar uma resenha: PATCH
    app.patch("/livro/:id/resenha/:resenhaId", async (req, res) => {
      const { resenhaId } = req.params; // ID da resenha a ser atualizada
      const { texto } = req.body; // Novos dados da resenha
      const filter = { _id: new ObjectId(resenhaId) }; // Filtro para localizar a resenha
      const atualizarDoc = {
        $set: {
          texto: texto, // Atualiza o texto da resenha
          data: new Date() // Atualiza a data da resenha
        }
      };
      try {
        console.log("Atualizando resenha com ID:", resenhaId); // Log para depuração
        const result = await colecaoResenhas.updateOne(filter, atualizarDoc);
        if (result.matchedCount === 0) {
          res.status(404).send({ message: 'Resenha não encontrada' });
        } else {
          res.status(200).send({ message: 'Resenha atualizada com sucesso' });
        }
      } catch (error) {
        console.error("Erro ao atualizar resenha:", error);
        res.status(500).send({ message: 'Erro ao atualizar resenha' });
      }
    });

    // Inicia o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

run().catch(console.dir);
